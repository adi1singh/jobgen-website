import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, relative } from 'node:path';
const root=resolve('dist');
async function walk(path){const all=await readdir(path,{withFileTypes:true});return (await Promise.all(all.map(e=>e.isDirectory()?walk(join(path,e.name)):join(path,e.name)))).flat();}
const pages=(await walk(root)).filter(p=>extname(p)==='.html');
const data=new Map(await Promise.all(pages.map(async p=>{const html=(await readFile(p,'utf8')).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');return[p,{ids:[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]),links:[...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&'))}];})));
const failures=[];let checked=0;
for(const [page,{ids,links}] of data){
 for(const id of new Set(ids.filter((v,i)=>ids.indexOf(v)!==i)))failures.push(`${relative(root,page)}: duplicate id ${id}`);
 for(const link of links){
  if(/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link))continue;
  const base=new URL('https://local.test/'+relative(root,page));const url=new URL(link,base);
  let target=resolve(root,'.'+decodeURIComponent(url.pathname));
  if(target!==root&&!target.startsWith(root+'/')){failures.push(`${page}: path escapes build`);continue;}
  try{if((await stat(target)).isDirectory())target=join(target,'index.html');await stat(target);}catch{failures.push(`${relative(root,page)}: missing ${link}`);continue;}
  checked++;
  if(url.hash&&extname(target)==='.html'&&!data.get(target)?.ids.includes(decodeURIComponent(url.hash.slice(1))))failures.push(`${relative(root,page)}: missing anchor ${link}`);
 }
}
if(failures.length){console.error([...new Set(failures)].join('\n'));process.exitCode=1;}else console.log(`${pages.length} HTML pages: ${checked} internal links/assets and all IDs valid.`);

(() => {
 const root = document.querySelector('.revamp-home');
 if (!root) return;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const wide = matchMedia('(min-width: 801px)');
 const chapter = root.querySelector('.problem-chapter');
 const scenes = [...root.querySelectorAll('[data-problem-scene]')];
 const problemButtons = [...root.querySelectorAll('[data-problem-go]')];
 const heroArt = root.querySelector('.hero-art');
 let activeScene = -1;
 const scene = index => {
  if (index === activeScene) return;
  activeScene = index;
  scenes.forEach((el,i) => { const active = i === index; el.classList.toggle('is-active',active); if (wide.matches && !reduced.matches) el.setAttribute('aria-hidden', String(!active)); else el.removeAttribute('aria-hidden'); });
  problemButtons.forEach((b,i) => { b.classList.toggle('is-active',i === index); b.setAttribute('aria-pressed',String(i === index)); });
 };
 const mode = () => { document.body.classList.toggle('motion-ready', !reduced.matches && wide.matches); activeScene = -1; update(); };
 const ink = root.querySelector('[data-ink]');
 let inkWords = [];
 if (ink && !reduced.matches) {
  ink.querySelectorAll(':scope > span').forEach(line => {
   const words = line.textContent.split(' '); line.textContent = '';
   words.forEach((word,i) => { const span = document.createElement('span'); span.className = 'ink-word'; span.textContent = word; line.append(span); if (i < words.length - 1) line.append(' '); inkWords.push(span); });
  });
 }
 let scheduled = false;
 function update() {
  scheduled = false;
  if (wide.matches && !reduced.matches) {
   const rect = chapter.getBoundingClientRect();
   const distance = Math.max(1, chapter.offsetHeight - innerHeight + 86);
   scene(Math.min(2, Math.max(0, Math.floor((-rect.top + 100) / distance * 3))));
   if (heroArt && scrollY < innerHeight * 1.5) heroArt.style.transform = 'translateY(' + Math.min(100, scrollY * .13) + 'px) rotate(' + Math.min(5,scrollY * .004) + 'deg)';
  } else { scene(0); scenes.forEach(el => el.removeAttribute('aria-hidden')); if (heroArt) heroArt.style.transform = ''; }
  if (inkWords.length) {
   const r = ink.getBoundingClientRect(); const p = reduced.matches ? 1 : Math.max(0,Math.min(1,(innerHeight * .85 - r.top)/(innerHeight * .5)));
   inkWords.forEach((word,i) => word.classList.toggle('inked',p >= (i + 1)/inkWords.length));
  }
 }
 function requestUpdate(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 addEventListener('scroll',requestUpdate,{passive:true}); addEventListener('resize',requestUpdate,{passive:true}); reduced.addEventListener('change',mode); wide.addEventListener('change',mode);
 problemButtons.forEach((b,i) => b.addEventListener('click',() => {
  if (wide.matches && !reduced.matches) {
   const top = chapter.getBoundingClientRect().top + scrollY;
   const distance = chapter.offsetHeight - innerHeight + 86;
   scrollTo({top:top + distance * (i + .12)/3 - 85,behavior:'smooth'});
  } else scenes[i].scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});
 }));
 const tabs = [...root.querySelectorAll('[data-agent-tab]')];
 function selectAgent(key,focus=false){
  tabs.forEach(tab => { const active = tab.dataset.agentTab === key; tab.setAttribute('aria-selected',String(active)); tab.tabIndex = active ? 0 : -1; const panel = document.getElementById(tab.getAttribute('aria-controls')); if(panel)panel.hidden=!active; if(active&&focus)tab.focus(); });
 }
 tabs.forEach((tab,i) => {
  tab.addEventListener('click',() => selectAgent(tab.dataset.agentTab));
  tab.addEventListener('keydown',e => {
   let index = i; if(e.key==='ArrowRight')index=(i+1)%tabs.length; else if(e.key==='ArrowLeft')index=(i+tabs.length-1)%tabs.length; else if(e.key==='Home')index=0; else if(e.key==='End')index=tabs.length-1; else return;
   e.preventDefault();selectAgent(tabs[index].dataset.agentTab,true);
  });
 });
 root.querySelectorAll('[data-select-agent]').forEach(link => link.addEventListener('click',() => selectAgent(link.dataset.selectAgent)));
 function selectHash(){ const key=location.hash.replace('#product-',''); if(tabs.some(t=>t.dataset.agentTab===key))selectAgent(key); }
 addEventListener('hashchange',selectHash);selectHash();
 const flowSteps=[...root.querySelectorAll('[data-flow-step]')];
 flowSteps.forEach(button=>button.addEventListener('click',()=>{flowSteps.forEach(b=>{const on=b===button;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});root.querySelector('.flow-detail').textContent=button.querySelector('.flow-step-detail').textContent;}));
 // Keep the text inside the native disclosure accurate in both states.
 const calculator=root.querySelector('.value-calculator');
 calculator?.addEventListener('toggle',()=>{const toggle=calculator.querySelector('.calculator-toggle');toggle.firstChild.textContent=calculator.open?'CLOSE CALCULATOR ':'OPEN CALCULATOR ';});
 mode();
})();

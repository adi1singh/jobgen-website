import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jobgen.ai",
  // Pages build to /receptionist/index.html etc., so links work with or without a trailing slash.
  build: { format: "directory" },
  // Until the home page is built (step 3), the root points at Jenny's page.
  redirects: { "/": "/receptionist/" },
});

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();
// O comando externo do Cloudflare chama o adaptador; internamente compilamos o Next.js.
config.buildCommand = "npm run build:next";

export default config;

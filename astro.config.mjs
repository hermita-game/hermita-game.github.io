import { defineConfig } from 'astro/config';

// https://astro.build/config
import partytown from "@astrojs/partytown";
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [/* partytown(),  */svelte()]
});
import { defineConfig } from 'astro/config';

// https://astro.build/config
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import partytown from '@astrojs/partytown';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://moondust.com',
  integrations: [
    alpinejs(),
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      config: {
        applyBaseStyles: false,
      },
    }),
    partytown(),
    sitemap(),
  ],
});

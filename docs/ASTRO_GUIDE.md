## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Deployment (Cloudflare Pages)

We utilize the `@astrojs/cloudflare` adapter.
When pushing to the `main` branch, the GitHub Action automatically runs `npm run build` targeting Cloudflare's Edge nodes.
Ensure you have set `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your GitHub repository secrets.

## Advanced Canvas Integration (WebGPU & TSL)

When working with `three/webgpu` and `three/tsl`, remember that these features are bleeding edge. 
- Always lazy-load or isolate WebGPU components (like `GitHubGlobe.tsx`) into their own React roots via `<Component client:only="react" />`.
- TSL (Three Shading Language) cannot be transpiled directly by older build chains. Rely on Astro's modern Vite 6 engine to handle the ESM imports seamlessly.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# SvelteKit Server-Sent Event Example

```bash
pnpm i
pnpm dev
```

Consider setting the ORIGIN [environment](https://kit.svelte.dev/docs/adapter-node#environment-variables-origin-protocol-header-and-host-header) variable if you're using `adapter-node` to avoid the "Form submission forbidden" error. 

```bash
pnpm build
ORIGIN=https://my.site node build
```

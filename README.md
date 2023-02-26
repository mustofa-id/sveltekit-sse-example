# SvelteKit Server-Sent Event Example

```bash
pnpm i
pnpm dev
```

If you using `adapter-node` consider to set `ORIGIN` [environment](https://kit.svelte.dev/docs/adapter-node#environment-variables-origin-protocol-header-and-host-header) variable value to prevent form submit forbidden error.

```bash
pnpm build
ORIGIN=https://my.site node build
```

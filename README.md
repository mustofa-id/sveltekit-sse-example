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

![image](https://user-images.githubusercontent.com/25121822/221392108-4e7cd284-1453-43cc-bd66-9dca3dbb855b.png)

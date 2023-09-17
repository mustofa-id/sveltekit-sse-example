<script>
	import { onMount } from 'svelte';

	/** @type {string} */
	let server_time;

	function subscribe() {
		const sse = new EventSource('/current-time');
		sse.onmessage = (e) => (server_time = e.data);
		return () => sse.close();
	}

	onMount(subscribe);
</script>

<pre>{server_time}</pre>

<script>
	const examples = [
		// label, url
		['Realtime Server Time', '/current-time'],
		['Simple Chat Room', '/simple-chat']
	];
</script>

<ol type="1">
	{#each examples as [text, href]}
		<li><a {href}>{text}</a></li>
	{/each}
</ol>

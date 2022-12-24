<script>
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	function subscribe() {
		const sse = new EventSource('/simple-chat');
		sse.onmessage = () => invalidate('chats');
		return () => sse.close();
	}

	onMount(() => subscribe());
</script>

<main>
	<p>
		Open in <a href="/simple-chat" target="_blank" rel="noopener noreferrer">new tab</a> and join as
		other user
	</p>

	<fieldset>
		<legend>Chat Room</legend>
		<section>
			<article>
				{#each data.chats as chat}
					{#if chat.type === 'join'}
						<p><mark>{chat.user}</mark> joined</p>
					{:else}
						<p>
							<strong>{chat.user}</strong>
							{#if chat.user === form?.user}
								<em>(you)</em>
							{/if}
							: {chat.message}
						</p>
					{/if}
				{:else}
					<em>No chat yet</em>
				{/each}
			</article>
		</section>

		{#if form?.user}
			<form
				action="?/send"
				method="post"
				use:enhance={() =>
					/* prevent `form` prop being updated  */
					({ form }) => {
						// form.reset();
						// TODO: resetting form here cause request hang, need to be addressed.
					}}
			>
				<input type="text" name="name" value={form?.user} hidden />
				<!-- svelte-ignore a11y-autofocus -->
				<input type="text" name="message" placeholder="Type your message" autofocus required />
				<button>Send</button>
			</form>
		{:else}
			<form action="?/join" method="post" use:enhance>
				<input type="text" name="name" placeholder="Your name" required />
				<button>Join</button>
			</form>
		{/if}
	</fieldset>
</main>

<style>
	fieldset {
		max-width: 16rem;
		height: 24rem;
	}

	section {
		height: 100%;
		overflow-y: auto;
		display: flex;
		flex-direction: column-reverse;
	}
</style>

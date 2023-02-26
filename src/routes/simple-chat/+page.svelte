<script>
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	/** @type {string}*/
	let user;

	$: if (form?.join && !user) set_user();

	function set_user() {
		user = form?.user;
	}

	function subscribe() {
		const sse = new EventSource('/simple-chat');
		sse.onmessage = () => invalidate('chats');
		return () => sse.close();
	}

	onMount(subscribe);
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

		{#if user}
			<form
				action="?/send"
				method="post"
				on:reset={() => console.log('reset')}
				use:enhance={() =>
					/* prevent `form` prop being auto updated  */
					({ form, result, update }) => {
						if (result.type === 'success') {
							// clear message input
							const message_input = form.elements.namedItem('message');
							if (message_input instanceof HTMLInputElement) {
								message_input.value = '';
								return;
							}
						}
						update();
					}}
			>
				<input type="text" name="name" value={user} hidden />
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

		{#if form?.message}
			<br />
			<em>{form?.message}</em>
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

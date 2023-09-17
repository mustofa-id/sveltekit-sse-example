export function GET() {
	/** @type {ReturnType<typeof setInterval> | undefined} */
	let timer;

	const stream = new ReadableStream({
		start(controller) {
			timer = setInterval(() => {
				const current_time = new Date().toLocaleString();
				const data = `event: message\ndata: ${current_time}\n\n`;
				controller.enqueue(data);
			}, 1000);
		},
		cancel() {
			clearInterval(timer);
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream'
		}
	});
}

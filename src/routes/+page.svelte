<script lang="ts">
	enum State {
		NEW,
		RUNNING,
		PAUSED
	}

	let state: State = State.NEW;
	let startTime: number = 0;
	let elapsedTime: number = 0;
    let oldElapsedTime: number = 0;
	let interval: NodeJS.Timer;

    const pad2 = (number: number) => `00${number}`.slice(-2);
    $: seconds = pad2(Math.floor(((elapsedTime / 1000) % 60)))
    $: minutes = pad2(Math.floor(((elapsedTime / 1000 / 60) % 60)))
    $: formatted = `${minutes}:${seconds}`

	const handleStart = () => {
		startTime = Date.now();
		state = State.RUNNING;
		interval = setInterval(() => {
			if (state === State.RUNNING) {
				const endTime = Date.now();
				elapsedTime = endTime - startTime + oldElapsedTime;
			}
		});
	};

	const handleReset = () => {
		clearInterval(interval);
		state = State.NEW;
		elapsedTime = 0;
		startTime = 0;
		oldElapsedTime = 0;
	};

	const handlePause = () => {
		state = State.PAUSED;
        oldElapsedTime = elapsedTime;
	};

    const handleResume = () => {
        startTime = Date.now();
        state = State.RUNNING;
    }
</script>

<main class="h-screen w-screen flex flex-col justify-center items-center gap-6">
	<h1 class="text-4xl text-center font-extrabold">Timelet</h1>
	<div class="shadow-containerBox shadow-gray-700 w-1/2 h-48 rounded bg-[#ffebe926] items-center justify-center flex flex-col p-4">
		<p class="mb-8 text-xl w-32 p-1.5 text-center border rounded bg-charcoal">{formatted}</p>

		<div class="text-right">
			{#if state === State.NEW}
				<button
					on:click={handleStart}
					class="mr-2 bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400">Start</button
				>
			{/if}
			{#if state === State.RUNNING}
				<button
					on:click={handleReset}
					class="mr-2 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400">Reset</button
				>
				<button on:click={handlePause} class="mr-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400"
					>Pause</button
				>
			{/if}
			{#if state === State.PAUSED}
				<button
					on:click={handleReset}
					class="mr-2 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-400">Reset</button
				>
				<button on:click={handleResume} class="mr-2 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-400"
					>Resume</button
				>
			{/if}
		</div>
	</div>
</main>

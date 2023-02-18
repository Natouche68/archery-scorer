<script lang="ts">
	import { scoreSheet } from './lib/ScoreSheet';
	import Navbar from './lib/Navbar.svelte';
	import Home from './lib/Home.svelte';
	import ScoreSheetEditor from './lib/ScoreSheetEditor.svelte';
	import { fade } from 'svelte/transition';
</script>

<Navbar />
{#if $scoreSheet}
	<div in:fade={{ delay: 200, duration: 200 }} out:fade={{ delay: 0, duration: 200 }}>
		<ScoreSheetEditor />
	</div>
{:else}
	<div in:fade={{ delay: 200, duration: 200 }} out:fade={{ delay: 0, duration: 200 }}>
		<Home />
	</div>
{/if}

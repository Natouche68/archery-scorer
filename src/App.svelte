<script lang="ts">
	import { scoreSheet } from './lib/ScoreSheet';
	import Navbar from './lib/Navbar.svelte';
	import Home from './lib/Home.svelte';
	import ScoreSheetEditor from './lib/ScoreSheetEditor.svelte';
</script>

<Navbar />
{#if $scoreSheet}
	<ScoreSheetEditor />
{:else}
	<Home />
{/if}

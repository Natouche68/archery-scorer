<script lang="ts">
	import { scoreSheet } from './lib/ScoreSheet';
	import Navbar from './lib/Navbar.svelte';
	import Home from './lib/Home.svelte';
</script>

<Navbar />
{#if $scoreSheet}
	{$scoreSheet.name}
{:else}
	<Home />
{/if}

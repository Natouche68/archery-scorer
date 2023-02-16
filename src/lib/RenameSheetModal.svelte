<script lang="ts">
	import { scoreSheet } from './ScoreSheet';
	import { saveSheet } from './SaveUtils';
	import { slide } from 'svelte/transition';

	export let isModalActive: boolean = false;

	let newSheetName: string = $scoreSheet.name;

	function onEditButtonClicked(): void {
		$scoreSheet.name = newSheetName;
		scoreSheet.set($scoreSheet);
		saveSheet();

		isModalActive = false;
	}
</script>

{#if isModalActive}
	<form class="modal" on:submit|preventDefault={onEditButtonClicked} transition:slide>
		<div class="title">Modifier le nom de cette feuille de score ?</div>
		<input type="text" bind:value={newSheetName} required />

		<button type="submit" class="important">Modifier</button>
		<button on:click={() => (isModalActive = false)}>Annuler</button>
	</form>
{/if}

<style>
	.modal {
		display: block;
		position: fixed;
		background-color: var(--light-gray);
		bottom: 0;
		width: 90%;
		text-align: center;
		padding: 32px 5% 12px 5%;
	}

	.title {
		font-size: 24px;
		font-weight: 600;
	}

	input {
		margin: 8px 0;
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-family: Poppins, Calibri, sans-serif;
		background: var(--light-gray);
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		color: var(--neutral-color);
		outline: none;
		transition: all 0.4s ease;
	}

	input:focus {
		color: var(--primary-color);
		border-bottom: 3px solid var(--primary-color);
		margin: 7px 0;
	}

	button {
		display: block;
		width: 100%;
		margin: 24px 0;
		padding: 8px;
		font-family: Poppins, Calibri, sans-serif;
		font-size: 20px;
		font-weight: 500;
		border: none;
		border-radius: 12px;
		background: var(--light-gray);
		color: var(--neutral-color);
	}

	button.important {
		background: var(--primary-color);
		color: #fff;
	}
</style>

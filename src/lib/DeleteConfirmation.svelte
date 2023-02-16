<script lang="ts">
	import { scoreSheet } from './ScoreSheet';
	import { deleteSheet } from './SaveUtils';
	import { slide } from 'svelte/transition';

	export let isModalActive: boolean = false;

	function onDeleteButtonClicked(): void {
		isModalActive = false;
		deleteSheet();
	}
</script>

{#if isModalActive}
	<div class="modal" transition:slide>
		<div class="title">Supprimer cette feuille de score ?</div>
		<div class="subtitle">{$scoreSheet.name}</div>

		<button class="danger" on:click={onDeleteButtonClicked}>Supprimer</button>
		<button on:click={() => (isModalActive = false)}>Annuler</button>
	</div>
{/if}

<style>
	.modal {
		display: block;
		position: fixed;
		background-color: var(--light-gray);
		bottom: 0;
		width: 90%;
		text-align: center;
		padding: 32px 5%;
	}

	.title {
		font-size: 24px;
		font-weight: 600;
	}

	.subtitle {
		font-size: 20px;
		color: var(--neutral-color);
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
		background: var(--primary-color);
		color: #fff;
	}

	.danger {
		background: var(--danger-color);
	}
</style>

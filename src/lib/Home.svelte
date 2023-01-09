<script lang="ts">
	let volleyNumber: number;
	let arrowNumber: number;
</script>

<form class="home">
	<div class="title">Créer une nouvelle feuille de score</div>
	<input type="number" bind:value={volleyNumber} placeholder="Nombre de volées" required />
	<input type="number" bind:value={arrowNumber} placeholder="Nombre de flèches" required />
	<button type="submit">Créer</button>
</form>

<style>
	.home {
		padding: 24px 5%;
	}

	.title {
		font-weight: 600;
		font-size: 36px;
		margin: 0 0 16px 0;
	}

	input {
		margin: 8px 0;
		width: 100%;
		font-size: 18px;
		font-family: Poppins, Calibri, sans-serif;
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		color: var(--neutral-color);
		outline: none;
		transition: all 0.4s ease;
	}

	input::placeholder {
		color: var(--neutral-color);
	}

	input:focus {
		color: var(--primary-color);
		border-bottom: 3px solid var(--primary-color);
		margin: 7px 0;
	}

	button {
		margin: 16px 6px;
		padding: 6px;
		width: calc(100% - 6px * 2);
		font-family: Poppins, Calibri, sans-serif;
		font-size: 20px;
		font-weight: 500;
		border: none;
		border-radius: 6px;
		background: var(--primary-color);
		color: #fff;
		transition: all 0.4s ease;
		cursor: pointer;
	}

	button:hover {
		margin: 18px 9px;
		padding: 3px;
		border-radius: 12px;
		width: calc(100% - 9px * 2);
	}
</style>

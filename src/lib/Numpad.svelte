<script lang="ts">
	export let isNumpadActive: boolean = false;
</script>

{#if isNumpadActive}
	<div class="numpad">
		<div class="row">
			<div class="key">1</div>
			<div class="key">2</div>
			<div class="key">3</div>
		</div>
		<div class="row">
			<div class="key">4</div>
			<div class="key">5</div>
			<div class="key">6</div>
		</div>
		<div class="row">
			<div class="key">7</div>
			<div class="key">8</div>
			<div class="key">9</div>
		</div>
		<div class="row">
			<div class="key">M</div>
			<div class="key">10</div>
			<div class="key">←</div>
		</div>
	</div>
{/if}

<style>
	.numpad {
		display: block;
		position: fixed;
		background-color: var(--primary-color);
		bottom: 0;
		width: 100%;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.key {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--secondary-color);
		color: #fff;
		margin: 4px;
		width: 30%;
		height: 64px;
		text-align: center;
		font-size: 28px;
		font-weight: 500;
		border-radius: 12px;
	}

	.key:hover {
		background: var(--primary-color);
	}
</style>

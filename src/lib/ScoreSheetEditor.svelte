<script lang="ts">
	import { scoreSheet } from './ScoreSheet';
	import Numpad from './Numpad.svelte';

	let isNumpadActive: boolean = false;

	function calcTotalVolley(index: number): number {
		let total: number = 0;

		$scoreSheet.scoreSheet[index].forEach((value) => {
			if (value != '-' && value != 'M') {
				total += value;
			}
		});

		return total;
	}

	function calcCumulTotal(index: number): number {
		if (index == 0) {
			return calcTotalVolley(index);
		} else {
			return calcTotalVolley(index) + calcCumulTotal(index - 1);
		}
	}
</script>

<Numpad bind:isNumpadActive />

<div class="score-sheet-editor">
	<div class="title">
		{$scoreSheet.name}
	</div>
	{#each $scoreSheet.scoreSheet as volley, index}
		<div class="volley">
			{#each volley as score}
				<div class="score">
					{score + ' '}
				</div>
			{/each}
			<div class="total">
				{calcTotalVolley(index)}
			</div>
			<div class="total">
				{calcCumulTotal(index)}
			</div>
		</div>
	{/each}
</div>

{#if isNumpadActive}
	<div style="height: 288px;" />
{/if}

<style>
	.score-sheet-editor {
		padding: 24px 5%;
	}

	.title {
		font-weight: 600;
		font-size: 36px;
		margin: 0 0 16px 0;
	}

	.volley {
		padding: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid var(--neutral-color);
	}

	.volley:last-child {
		border: none;
	}

	.score {
		width: 60px;
		text-align: center;
		font-size: 20px;
	}

	.total {
		width: 60px;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
	}
</style>

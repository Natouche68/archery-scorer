<script lang="ts">
	import { scoreSheet } from './ScoreSheet';
	import Numpad from './Numpad.svelte';

	let isNumpadActive: boolean = false;
	let editingVolley: number | '' = '';
	let editingArrow: number = 0;

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

	function updateVolley(index: number): void {
		isNumpadActive = true;
		editingVolley = index;
	}
</script>

<Numpad bind:isNumpadActive bind:editingVolley bind:editingArrow />

{#key $scoreSheet}
	<div class="score-sheet-editor">
		<div class="title">
			{$scoreSheet.name}
		</div>
		{#each $scoreSheet.scoreSheet as volley, index}
			<button
				class="volley {editingVolley === index ? ' editing' : ''}"
				on:click={() => {
					updateVolley(index);
				}}
			>
				{#each volley as score, currentArrow}
					<div
						class="score {editingVolley === index && editingArrow === currentArrow
							? ' editing'
							: ''}"
					>
						{score + ' '}
					</div>
				{/each}
				<div class="total">
					{calcTotalVolley(index)}
				</div>
				<div class="total">
					{calcCumulTotal(index)}
				</div>
			</button>
		{/each}
	</div>
{/key}

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
		width: 100%;
		padding: 6px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: none;
		border-bottom: 1px solid var(--neutral-color);
		background: #fff;
		font-family: Poppins, Calibri, sans-serif;
		transition: all 0.4s ease;
	}

	.volley:last-child {
		border: none;
	}

	.volley.editing {
		background: var(--light-gray);
	}

	.score {
		width: 60px;
		text-align: center;
		font-size: 20px;
		transition: all 0.4s ease;
	}

	.score.editing {
		color: var(--primary-color);
		transform: scale(1.2);
	}

	.total {
		width: 60px;
		text-align: center;
		font-size: 20px;
		font-weight: 500;
	}
</style>

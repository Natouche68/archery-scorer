<script lang="ts">
	import { scoreSheet } from './ScoreSheet';
	import { saveSheet } from './SaveUtils';

	export let isNumpadActive: boolean = false;
	export let editingVolley: number | '' = '';
	export let editingArrow: number = 0;

	type NumpadKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'M' | '←';

	function keyClicked(key: NumpadKey): void {
		if (key == '←') {
			$scoreSheet.scoreSheet[editingVolley][editingArrow] = '-';
			editingArrow--;

			if (editingArrow == -1) {
				cancelNumpad();
			}
		} else {
			$scoreSheet.scoreSheet[editingVolley][editingArrow] = key;
			editingArrow++;

			if (editingArrow == $scoreSheet.arrowNumber) {
				$scoreSheet.scoreSheet[editingVolley].sort((a: number, b: number) => b - a);
				saveSheet();

				cancelNumpad();
			}
		}

		scoreSheet.set($scoreSheet);
	}

	function cancelNumpad() {
		isNumpadActive = false;
		editingVolley = '';
		editingArrow = 0;
	}
</script>

{#if isNumpadActive}
	<div class="numpad">
		<div class="row">
			<button
				class="key"
				on:click={() => {
					keyClicked(1);
				}}
			>
				1
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(2);
				}}
			>
				2
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(3);
				}}
			>
				3
			</button>
		</div>
		<div class="row">
			<button
				class="key"
				on:click={() => {
					keyClicked(4);
				}}
			>
				4
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(5);
				}}
			>
				5
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(6);
				}}
			>
				6
			</button>
		</div>
		<div class="row">
			<button
				class="key"
				on:click={() => {
					keyClicked(7);
				}}
			>
				7
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(8);
				}}
			>
				8
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(9);
				}}
			>
				9
			</button>
		</div>
		<div class="row">
			<button
				class="key"
				on:click={() => {
					keyClicked('M');
				}}
			>
				M
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked(10);
				}}
			>
				10
			</button>
			<button
				class="key"
				on:click={() => {
					keyClicked('←');
				}}
			>
				←
			</button>
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
		font-family: Poppins, Calibri, sans-serif;
		font-size: 28px;
		font-weight: 500;
		border: none;
		border-radius: 12px;
		cursor: pointer;
	}

	.key:hover {
		background: var(--primary-color);
	}
</style>

<script lang="ts">
	export let fillColor: string = '#000000';
	export let size: number = 24;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	style="fill: {fillColor};"
>
	<path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
</svg>

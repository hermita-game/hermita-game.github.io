<script>
	export let rotate = 0;
	export let x = 0;
	export let y = 0;
</script>

<div style="bottom:{-y}px;right:{-x}px;transform: translate(50%,50%) rotate({rotate}deg);">
	<slot />
</div>

<style>
	div {
		position: absolute;
	}
	div :global(svg) {
		margin-bottom: -4px;
	}
	div :global(polygon) {
		fill: #333;
		stroke: white !important;
	}
</style>

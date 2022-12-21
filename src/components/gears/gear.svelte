<script>
	export let rotate = 0;
	export let x = 0;
	export let y = 0;
</script>

<div class="wrap" style="bottom:{-y}px;right:{-x}px;">
	<div data-scroll-rotate={rotate}>
		<slot />
	</div>
</div>

<style>
	.wrap {
		position: absolute;
		transform: translate(50%,50%);
	}
	div :global(svg) {
		margin-bottom: -4px;
	}
	div :global(polygon) {
		fill: #333;
		stroke: white !important;
	}
</style>

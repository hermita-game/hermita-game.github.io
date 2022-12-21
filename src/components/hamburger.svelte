<script>
	export let open = false;
</script>

<!-------- Thanks José Rosário for the codepen  -------->
<!-- https://codepen.io/JoseRosario/pen/BWqMwK -->
<button
	class:open
	class="wrapper-menu"
	on:click={() => {
		open = !open;
	}}
	aria-label="Menu"
>
	<div class="line-menu half start" />
	<div class="line-menu" />
	<div class="line-menu half end" />
</button>

<style>
	.wrapper-menu {
		width: var(--size-menu);
		height: var(--size-menu);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		cursor: pointer;
		transition: transform 330ms ease-out;
		background: none;
		border: none;
	}

	.wrapper-menu.open {
		transform: rotate(-45deg);
	}

	.line-menu {
		background-color: #fff;
		width: 100%;
		height: 2px;
	}

	.line-menu.half {
		width: 50%;
	}

	.line-menu.start {
		transition: transform 200ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
		transform-origin: right;
	}

	.open .line-menu.start {
		transform: rotate(-90deg) translateX(3px);
	}

	.line-menu.end {
		align-self: flex-end;
		transition: transform 200ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
		transform-origin: left;
	}

	.open .line-menu.end {
		transform: rotate(-90deg) translateX(-3px);
	}
</style>

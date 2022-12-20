<script lang="ts">
	import Gear_8 from './gear_8.svelte';
	import Gear_12 from './gear_12.svelte';
	import Gear_16 from './gear_16.svelte';
	import Gear_20 from './gear_20.svelte';
	import Gear_60 from './gear_60.svelte';
	import Gear from './gear.svelte';
	import { scroll } from '../../scripts/scroll';

	let rotate = 0;
	let rotate_bg = 0;

	scroll.on(({scroll}: {scroll: number}) => {
		rotate = scroll;
	});

	$: rotate_bg = rotate * 0.75;
</script>

<div class="gears">
	<Gear rotate={rotate_bg / 20} x={8} y={-310}><Gear_20 /></Gear>
	<Gear rotate={rotate_bg / 8} x={-495} y={-17}><Gear_8 /></Gear>
	<Gear rotate={-rotate_bg / 16} x={-238} y={-18}><Gear_16 /></Gear>
	<Gear rotate={-rotate / 12} x={-238} y={-18}><Gear_12 /></Gear>
	<Gear rotate={rotate / 60} x={70} y={-50}><Gear_60 /></Gear>
</div>

<style>
	.gears {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 0;
		transform: scale(0.3);
	}
</style>

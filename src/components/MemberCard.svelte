<script lang="ts">
	export let name: string;
	export let description: string[];
	export let tiles: string[];
</script>

<div class="member-card">
	<div class="member-card__front">
		<div class="mask">
			<img src="/images/Members/{name}.png" alt="" class="profile">
		</div>
		<h2 class="member-card__name">{name}</h2>
	</div>
	<div class="member-card__back">
		<ul>
			{#each description as line}
				<li>{line}</li>
			{/each}
		</ul>
		<div class="tiles">
			{#each tiles as tile}
				<img src={tile} alt="" class="tile" style="transform: rotate({20*(0.5-Math.random())}deg) translate3D({Math.random()}rem, {Math.random()}rem, {2 + 4*Math.random()}rem)"/>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	$img-size: 20rem;
	.member-card {
		position: relative;
		height: 30rem;
		width: 20rem;
		text-align: center;
		perspective: 1000px;
		transform-style: preserve-3d;
	}
	.member-card__front, .member-card__back {
		position: absolute;
		top: 0;
		left: 0;
		width: min(20rem, 90vw);
		height: 25rem;
		background-color: #3b3b3b46;
		backface-visibility: hidden;
		transform-style: preserve-3d;
		transition: transform 0.6s ease-in-out;
	}
	.member-card__front {
		transform: rotateY(0deg);
	}
	.member-card__back {
		transform: rotateY(180deg);
	}

	.member-card:hover .profile {
		transform: scale(0.75);
	}
	.member-card:hover .member-card__front {
		transform: rotateY(-180deg);
		transition-delay: 0.6s;
	}
	.member-card:hover .member-card__back {
		transform: rotateY(0deg);
		transition-delay: 0.6s;
	}
	
	.mask {
		width: min(20rem, 90vw);
		height: min(20rem, 90vw);
		overflow: hidden;
		border-radius: 50%;
		transform: translate3D(0, -2rem, 2rem);
		backface-visibility: hidden;
	}
	.profile {
		width: 100%;
		height: auto;
		transform: scale(1.6);
		transform-origin: 50% 20%;
		transition: transform 0.6s ease-in-out;
	}
	h2 {
		transform: translateZ(4rem);
		backface-visibility: hidden;
	}
	ul {
		font-size: 1.2rem;
		position: absolute;
		top: 3rem;
		text-align: left;
		padding: 0 3rem;
		list-style: none;
		transform: translateZ(3rem);
		backface-visibility: hidden;
	}
	li {
		margin-bottom: 1rem;
	}
	.tiles {
		position: absolute;
		bottom: 3rem;
		transform-style: preserve-3d;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.tile {
		width: 3rem;
		height: 3rem;
		image-rendering: pixelated;
		backface-visibility: hidden;
	}
</style>
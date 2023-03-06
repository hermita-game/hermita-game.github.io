<script lang="ts">
    import Dots from "./Dots.svelte";
    import { marked } from "marked";

    export let posts: any[] = [];
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    const toDateString = (date: Date) => date.toLocaleDateString('fr-FR', options).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
</script>

<ul id="blog-list" data-scroll-ctx-wrap>
    {#each posts as post, i}
        <li
            data-scroll-ctx-text={toDateString(post.data.date)}
			data-scroll-ctx-image={post.data.image}
            class:upper={i%2==0}
            class:lower={i%2==1}
        >
            <div style="display:none;">
                {@html marked.parse(post.body)}
            </div>
            <div class="post">
                <h2>{post.data.title}</h2>
            </div>
            <Dots amount={post.data.daygap} />
        </li>
    {/each}
</ul>
<p class="date" data-scroll-ctx-display></p>
<div class="image" data-scroll-ctx-image-display />

<style lang="scss">
    $post-width: min(90vw, 16rem);
    $y-offset: 8rem;

    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        padding: 0 calc(50vw - $post-width / 2);
        margin-top: 10rem;
    }
    li {
        position: relative;
        width: $post-width;
    }
    .post {
        position: absolute;
        width: $post-width;
        transition: transform 0.5s ease;
        transform-origin: 0 0;
        cursor: pointer;
    }
    .upper .post {
        top: - $y-offset;
		transform: translateY(0.3 * $y-offset);
    }
    .lower .post {
        top: 0.8 * $y-offset;
		transform: translateY(-0.3 * $y-offset);
    }
    .post:active h2 {
        background-color: black;
        color: white;
    }
    li:global(.active) {
        .post {
			transform: none;
		}
        .post p { opacity: 1; }
    }
    h2 {
        font-family: 'Pixels';
        font-size: 1rem;
        padding: 0.5rem;
        background-color: white;
        color: black;
    }
    .post p {
        opacity: 0;
        transition: opacity 0.5s ease;
        font-family: 'Pixels';
        font-size: 1rem;
        padding: 0.5rem;
    }

    .date {
        position: fixed;
        left: 10rem;
        bottom: 5rem;
        font-size: 1.5rem;
        font-family: 'Pixels';
        text-transform: uppercase;
    }
	.image {
		position: fixed;
		top: 10rem;
		left: 10rem;
		height: calc(100vh - 15rem);
		width: calc(100vw - 15rem);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		z-index: -2;
		filter: brightness(0.7);
		transition: background-image 0.5s ease;
	}

    @media (max-width: 700px) {
        .date {
            font-size: 1rem;
            right: 1rem;
            bottom: 1rem;
            left: unset;
        }
		.image {
			top: unset;
			bottom: 5rem;
			left: 0.5rem;
			width: calc(100vw - 1rem);
			height: calc(100vh - 16rem);
		}

    }
</style>
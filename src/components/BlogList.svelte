<script lang="ts">
    export let posts: any[] = [];
</script>

<ul id="blog-list" data-scroll-skew="0.5">
    {#each posts as post}
        <li>
            <h2>{post.data.title}</h2>
            <p>{post.data.date}</p>
            <p>{post.body}</p>
        </li>
    {/each}
</ul>

<style>
    ul {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        gap: 3rem;
    }
    li {
        width: 30rem;
        height: 30rem;
        background: #232323;
        border-radius: 1rem;
    }
</style>
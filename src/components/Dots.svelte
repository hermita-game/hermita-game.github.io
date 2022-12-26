<script lang="ts">
    export let amount = 0;
</script>

<div class="dots">
    {#if amount > 0}
        <div class="line" />
    {/if}
    {#if amount < 10}
        {#each new Array(amount) as _}
            <div class="dot" />
        {/each}
    {:else}
        {#each new Array(5) as _}
            <div class="dot" />
        {/each}
        <div class="three-dots" />
        {#each new Array(5) as _}
            <div class="dot" />
        {/each}
    {/if}
</div>

<style lang="scss">
    @use "sass:math";
    $post-width: min(90vw, 16rem);
    $y-offset: 8rem;
    $line: 1px solid white;

    .dots {
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: $post-width;
        height: 0;
        top: 0;
        border-bottom: $line;
    }
    .line {
        position: absolute;
        height: $y-offset;
        border-left: $line;
        transition: height 0.5s ease;
        z-index: -1;
    }
    :global(.upper) > .dots > .line {
        top: -$y-offset;
    }
    :global(.active) > .dots > .line {
        height: 0;
    }
    .dot {
        $size: 0.5rem;
        z-index: 1;
        width: $size;
        height: $size;
        margin: -0.5 * $size;
        border: solid 1px white;
        background-color: var(--bg);
    }
    .three-dots {
        width: 2rem;
        height: 0;
        border-bottom: 1px dashed var(--bg);
    }
    :global(li.active) > .dots > .dot:nth-child(2) {
        background-color: white;
    }
</style>
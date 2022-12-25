<script lang="ts">
    export let amount = 0;
</script>

<div class="dots">
    <div class="line" />
    {#each new Array(amount) as _}
        <div class="dot" />
    {/each}
</div>

<style>
    .dots {
        position: absolute;
        z-index: -1;
        display: flex;
        justify-content: space-between;
        width: var(--post-width);
        height: 0;
        top: 0;
        border-bottom: var(--line);
    }
    .line {
        position: absolute;
        height: var(--y-offset);
        border-left: var(--line);
        top: 0;
        transform-origin: 0 0;
        transition: height 0.5s ease;
    }
    :global(.upper) > .dots > .line {
        transform: rotate(180deg);
    }
    :global(.active) > .dots > .line {
        height: 0;
    }
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        border: solid 1px white;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: var(--bg);
    }
</style>
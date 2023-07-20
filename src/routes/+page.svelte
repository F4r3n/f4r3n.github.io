<script lang="ts">
    import About from "$lib/about.svelte";
    import Projects from "$lib/projects.svelte";

    
    let nav = [
        {
            name: "about",
            component: About,
            isLink: false,
        },
        {
            name: "projects",
            component: Projects,
            isLink: false,
        },
        {
            name: "CV",
            href: "/cv",
            isLink: true,
        },
    ];

    function getDomain() {
        return "http://guillaume.kotulski.dev"
    }

    let currentNav = 0;
</script>

<main class="full-height">
    <div class="column right nav">
        {#each nav as n, i}
            {#if !n.isLink}
                <button
                    class="item"
                    on:click={() => {
                        currentNav = i;
                    }}
                    >{n.name}
                </button>
            {:else}
                <a class="item" href={getDomain() + n.href}>{n.name}</a>
            {/if}
        {/each}
    </div>
    <div class="component">
        <svelte:component this={nav[currentNav].component} />
    </div>
</main>

<style>
    :global(:root) {
        --main-color: #d2e6db;
        --secondary-color: #7c9989;
        --tertiary-color: #e6d3d1;
        --quaternary-color: #99706d;
    }

    .component {
        height: 100%;
    }

    .nav button {
        all: unset;

        width: fit-content;
        border-bottom: 5px solid var(--tertiary-color);
        font-size: larger;
    }
    .nav a {
        all: unset;

        width: fit-content;
        border-bottom: 5px solid var(--tertiary-color);
    }

    .item:hover {
        width: fit-content;
        cursor: pointer;
        font-weight: bold;
        border-bottom: 5px solid var(--quaternary-color);
    }

    .right {
        position: absolute;
        left: calc(100% - 90px);
        top: 10px;
    }

    .nav {
        gap: 10px;
    }

    .full-height {
        height: 100%;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    :global(body),
    :global(html) {
        margin: 0;
        padding: 0;
        height: 100%;
        color: var(--secondary-color);
        font-family: "Montserrat", sans-serif;
        background-color: var(--main-color);
    }

    :global(.t1) {
        font-size: x-large;
    }

    :global(.t2) {
        font-size: large;
    }

    :global(.t3) {
        font-size: larger;
    }

</style>

<script lang="ts">
    import About from "$lib/about.svelte";
    import Projects from "$lib/projects.svelte";
    import cv from "$lib/assets/cv.pdf"

    function getDomain() {
        return "http://guillaume.kotulski.dev"
    }
    
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
            href: cv,
            isLink: true,
        },
    ];



    let currentNav = 0;
</script>

<main class="full-height">
    <div class="right">
        <div class="column nav">
            {#each nav as n, i}
                {#if !n.isLink}
                    <button
                        class="item"
                        class:item-selected={currentNav === i}
                        on:click={() => {
                            currentNav = i;
                        }}
                        >{n.name}
                    </button>
                {:else}
                    <a class="item" target="_blank" href={n.href}>{n.name}</a>
                {/if}
            {/each}
        </div>
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
        --fith-color:#999184
    }

    .component {
        height: 100%;
    }


    .nav .item {
        all: unset;

        width: fit-content;
        border-bottom: 5px solid var(--tertiary-color);
        color:var(--fith-color);
        font-weight: bold;
        font-size: larger;
    }
    .nav a {
        all: unset;
        color:var(--fith-color);
        font-weight: bold;
        width: fit-content;
        border-bottom: 5px solid var(--tertiary-color);
    }

    .item:hover {
        width: fit-content;
        cursor: pointer;
        font-weight: bold;
        border-bottom: 5px solid var(--quaternary-color);
    }

    .item-selected {
        border-bottom: 5px solid var(--quaternary-color) !important; 
    }


    .right {
        position: fixed;
        height: 100%;
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

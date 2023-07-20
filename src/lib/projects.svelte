<script lang="ts">
    import { onMount } from "svelte";
    import repositoriesJSON from "$lib/assets/repositories.json";
    
    type Repository = {
        description: string | null;
        size: number;
        private: boolean;
        fork: boolean;
        url: string;
        name: string;
    };

    interface CustomOptionRepository {
        [key: string]: { visible: boolean };
    }

    let repositories: any[] = [];
    let customOptions: CustomOptionRepository = {
        OpenglLearning: {
            visible: false,
        },
        "f4r3n.github.io": {
            visible: false,
        },
        ImageProject: {
            visible: false,
        },
        "fast-decompress-wasm": {
            visible: false,
        },
    };
    onMount(async () => {
        repositories = Object.values(repositoriesJSON).sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
    });

    function shouldRepositoryBeVisible(inName: string) {
        const hasProperty = Object.hasOwn(customOptions, inName);
        if (hasProperty && Object.hasOwn(customOptions[inName], "visible"))
            return customOptions[inName].visible;
        return true;
    }

    function isValidRepository(inRepository: Repository) {
        return (
            shouldRepositoryBeVisible(inRepository.name) &&
            inRepository.description !== null &&
            inRepository.size > 1 &&
            !inRepository.private &&
            !inRepository.fork
        );
    }

    //
</script>

<main class="alinea">
    <div class="t1 gap">Repositories</div>
    <div class="column alinea flex-gap">
        {#if repositories !== null}
            {#each repositories as repository}
                {#if isValidRepository(repository)}
                    <div class="column">
                        <div class="row">
                            <a href={repository.url}>{repository.name}</a>
                            {#each Object.keys(repository.languages).slice(0, 2) as language}
                                <div>{language}</div>
                            {/each}
                        </div>
                        <div class="description">{repository.description}</div>
                    </div>
                {/if}
            {/each}
        {/if}
    </div>
</main>

<style>
    .alinea {
        padding-left: 10px;
    }

    .gap {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .flex-gap {
        gap: 15px;
    }

    .row {
        display: flex;
        flex-direction: row;
        gap: 5px;
    }
</style>

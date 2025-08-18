<script lang="ts">
  import { onMount } from "svelte";
  import repositoriesJSON from "$lib/assets/repositories.json";
  import { goto } from "$app/navigation";

  type Repository = {
    description: string | null;
    size: number;
    private: boolean;
    fork: boolean;
    url: string;
    name: string;
    languages: Record<string, number>;
  };

  interface CustomOptionRepository {
    [key: string]: { visible: boolean };
  }

  let repositories: Repository[] = [];
  let customOptions: CustomOptionRepository = {
    OpenglLearning: { visible: false },
    "f4r3n.github.io": { visible: false },
    ImageProject: { visible: false },
    "fast-decompress-wasm": { visible: false },
  };

  onMount(() => {
    repositories = Object.values(repositoriesJSON).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) as Repository[];
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

  const languageColors: Record<string, { color: string; bg: string }> = {
    javascript: { color: "text-yellow-500", bg: "bg-yellow-300" },
    python: { color: "text-blue-500", bg: "bg-blue-300" },
    java: { color: "text-orange-500", bg: "bg-orange-400" },
    ruby: { color: "text-red-500", bg: "bg-red-400" },
    php: { color: "text-indigo-500", bg: "bg-indigo-300" },
    "c++": { color: "text-pink-500", bg: "bg-pink-300" },
    "c#": { color: "text-green-500", bg: "bg-green-400" },
    typescript: { color: "text-sky-400", bg: "bg-sky-300" },
    shell: { color: "text-green-500", bg: "bg-green-300" },
    c: { color: "text-gray-500", bg: "bg-gray-400" },
    css: { color: "text-purple-500", bg: "bg-purple-300" },
    go: { color: "text-cyan-500", bg: "bg-cyan-300" },
    html: { color: "text-orange-500", bg: "bg-orange-400" },
    swift: { color: "text-orange-500", bg: "bg-orange-300" },
    scala: { color: "text-red-500", bg: "bg-red-400" },
    "objective-c": { color: "text-blue-500", bg: "bg-blue-300" },
    r: { color: "text-blue-500", bg: "bg-blue-200" },
    perl: { color: "text-cyan-500", bg: "bg-cyan-200" },
    lua: { color: "text-indigo-500", bg: "bg-indigo-200" },
    assembly: { color: "text-amber-500", bg: "bg-amber-200" },
    kotlin: { color: "text-orange-500", bg: "bg-orange-200" },
    "vim script": { color: "text-green-500", bg: "bg-green-200" },
    matlab: { color: "text-orange-500", bg: "bg-orange-300" },
    coffeescript: { color: "text-sky-500", bg: "bg-sky-200" },
    tex: { color: "text-green-500", bg: "bg-green-200" },
    haskell: { color: "text-purple-500", bg: "bg-purple-300" },
    "emacs lisp": { color: "text-purple-500", bg: "bg-purple-200" },
    pascal: { color: "text-yellow-500", bg: "bg-yellow-200" },
    clojure: { color: "text-red-500", bg: "bg-red-300" },
    powershell: { color: "text-blue-500", bg: "bg-blue-400" },
    groovy: { color: "text-orange-500", bg: "bg-orange-300" },
    ocaml: { color: "text-green-500", bg: "bg-green-200" },
    dart: { color: "text-cyan-500", bg: "bg-cyan-400" },
    "objective-c++": { color: "text-indigo-500", bg: "bg-indigo-400" },
    d: { color: "text-red-500", bg: "bg-red-300" },
    elm: { color: "text-cyan-500", bg: "bg-cyan-300" },
    crystal: { color: "text-gray-500", bg: "bg-gray-400" },
    actionscript: { color: "text-red-500", bg: "bg-red-400" },
    elixir: { color: "text-purple-500", bg: "bg-purple-300" },
    rust: { color: "text-orange-400", bg: "bg-orange-300" },
    racket: { color: "text-indigo-500", bg: "bg-indigo-400" },
    julia: { color: "text-purple-500", bg: "bg-purple-300" },
    vala: { color: "text-amber-500", bg: "bg-amber-200" },
    scheme: { color: "text-blue-500", bg: "bg-blue-300" },
    plpgsql: { color: "text-blue-500", bg: "bg-blue-400" },
    "f#": { color: "text-purple-500", bg: "bg-purple-300" },
    erlang: { color: "text-pink-500", bg: "bg-pink-300" },
    dockerfile: { color: "text-gray-500", bg: "bg-gray-400" },
    "common lisp": { color: "text-green-500", bg: "bg-green-300" },
    webassembly: { color: "text-gray-500", bg: "bg-gray-500" },
    vue: { color: "text-green-500", bg: "bg-green-400" },
    "standard ml": { color: "text-red-500", bg: "bg-red-300" },
    solidity: { color: "text-orange-500", bg: "bg-orange-400" },
    svelte: { color: "text-red-400", bg: "bg-red-400" },
    "objective-j": { color: "text-pink-500", bg: "bg-pink-400" },
    nix: { color: "text-indigo-500", bg: "bg-indigo-400" },
    nim: { color: "text-yellow-500", bg: "bg-yellow-400" },
    mercury: { color: "text-red-500", bg: "bg-red-400" },
    logos: { color: "text-gray-500", bg: "bg-gray-300" },
    "jupyter notebook": { color: "text-orange-500", bg: "bg-orange-400" },
    haxe: { color: "text-orange-500", bg: "bg-orange-400" },
    cuda: { color: "text-green-500", bg: "bg-green-500" },
    coq: { color: "text-red-500", bg: "bg-red-500" },
    cobol: { color: "text-indigo-500", bg: "bg-indigo-500" },
    batchfile: { color: "text-yellow-500", bg: "bg-yellow-300" },
    awk: { color: "text-indigo-500", bg: "bg-indigo-500" },
    xslt: { color: "text-pink-500", bg: "bg-pink-300" },
    xml: { color: "text-cyan-500", bg: "bg-cyan-400" },
    xquery: { color: "text-indigo-500", bg: "bg-indigo-400" },
    vhdl: { color: "text-gray-500", bg: "bg-gray-300" },
    vbscript: { color: "text-cyan-500", bg: "bg-cyan-300" },
    tsql: { color: "text-orange-500", bg: "bg-orange-400" },
    tcl: { color: "text-yellow-500", bg: "bg-yellow-200" },
    supercollider: { color: "text-amber-500", bg: "bg-amber-400" },
    stata: { color: "text-blue-500", bg: "bg-blue-400" },
    sql: { color: "text-orange-500", bg: "bg-orange-400" },
    sass: { color: "text-pink-500", bg: "bg-pink-400" },
    scss: { color: "text-pink-500", bg: "bg-pink-400" },
    less: { color: "text-gray-500", bg: "bg-gray-400" },
    default: { color: "text-primary", bg: "bg-gray-400" },
  };

  function getLanguageColor(lang: string): { color: string; bg: string } {
    return languageColors[lang.toLocaleLowerCase()] ?? languageColors.default;
  }
</script>

<main class="p-6">
  <h2 class="text-2xl font-bold mb-6">Repositories</h2>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each repositories as repository}
      {#if isValidRepository(repository)}
        <div class="card bg-base-100 shadow-md hover:shadow-xl transition">
          <div class="card-body">
            <a href={repository.url} target="_blank">
              <!-- Header -->
              <div class="flex items-center justify-between">
                <div class="card-title">
                  {repository.name}
                </div>
              </div>

              <!-- Description -->
              <p class="text-sm text-base-content/90 mt-2">
                {repository.description}
              </p>

              <!-- Languages -->
              {#if repository.languages}
                <div class="mt-4">
                  <!-- Progress bar -->
                  <div class="flex h-2 rounded overflow-hidden">
                    {#each Object.entries(repository.languages) as [lang, value]}
                      <div
                        class={`${getLanguageColor(lang).bg}`}
                        style:width="{value}%"
                      ></div>
                    {/each}
                  </div>

                  <!-- Labels -->
                  <div class="flex flex-wrap gap-3 mt-2 text-sm">
                    {#each Object.entries(repository.languages).slice(0, 3) as [lang, value]}
                      <div class="flex items-center gap-1">
                        <span
                          class={`w-3 h-3 rounded-full ${getLanguageColor(lang).color}`}
                        ></span>
                        <div class={`${getLanguageColor(lang).color}`}>
                          {lang}
                          {Math.round(value)}%
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}
            </a>
          </div>
        </div>
      {/if}
    {/each}
  </div>
</main>

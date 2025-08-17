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

  const languageColors: Record<string, string> = {
    javascript: "#f1e05a",
    python: "#3572a5",
    java: "#b07219",
    ruby: "#701516",
    php: "#4f5d95",
    "c++": "#f34b7d",
    "c#": "#178600",
    typescript: "#2b7489",
    shell: "#89e051",
    c: "#555555",
    css: "#563d7c",
    go: "#00add8",
    html: "#e34c26",
    swift: "#ffac45",
    scala: "#c22d40",
    "objective-c": "#438eff",
    r: "#198ce7",
    perl: "#0298c3",
    lua: "#000080",
    assembly: "#6e4c13",
    kotlin: "#f18e33",
    "vim script": "#199f4b",
    matlab: "#e16737",
    coffeescript: "#244776",
    tex: "#3d6117",
    haskell: "#5e5086",
    "emacs lisp": "#c065db",
    pascal: "#e3f171",
    clojure: "#db5855",
    powershell: "#012456",
    groovy: "#e69f56",
    ocaml: "#3be133",
    dart: "#00b4ab",
    "objective-c++": "#6866fb",
    d: "#ba595e",
    elm: "#60b5cc",
    crystal: "#000100",
    actionscript: "#882b0f",
    elixir: "#6e4a7e",
    rust: "#dea584",
    racket: "#22228f",
    julia: "#a270ba",
    vala: "#fbe5cd",
    scheme: "#1e4aec",
    plpgsql: "#336790",
    "f#": "#b845fc",
    erlang: "#b83998",
    dockerfile: "#384d54",
    "common lisp": "#3fb68b",
    webassembly: "#04133b",
    vue: "#41b883",
    "standard ml": "#dc566d",
    solidity: "#aa6746",
    svelte: "#ff3e00",
    "objective-j": "#ff0c5a",
    nix: "#7e7eff",
    nim: "#ffc200",
    mercury: "#ff2b2b",
    logos: "#aaaaaa",
    "kicad layout": "#2f4aab",
    "kicad legacy layout": "#2f4aab",
    "jupyter notebook": "#da5b0b",
    j: "#9eedff",
    isabelle: "#fefeff",
    haxe: "#df7900",
    frege: "#00cafe",
    forth: "#341708",
    cuda: "#3a4e3a",
    coq: "#ff0000",
    cobol: "#000080",
    bluespec: "#0000ff",
    bitbake: "#00bce6",
    batchfile: "#c1f12e",
    awk: "#000080",
    yacc: "#4b6c4b",
    xslt: "#eb8ceb",
    xml: "#0c343d",
    xquery: "#5232e7",
    xc: "#99da07",
    vhdl: "#adb2cb",
    vba: "#867db1",
    vbscript: "#15dcdc",
    tpl: "#28a8a8",
    tsql: "#e38c00",
    truffle: "#1e4aec",
    tcl: "#e4cc98",
    supercollider: "#46390b",
    stata: "#1a5f91",
    sqf: "#3f3f3f",
    sqlpl: "#e6e6e6",
    sql: "#e38c00",
    sas: "#b34936",
    rouge: "#cc0088",
    roff: "#ecdebe",
    robotframework: "#00c0c0",
    red: "#f50000",
    makefile: "#3d6a1e",
    scss: "#CD6799",
    sass: "#CF649A",
    less: "#2B3A42",
  };

  function getLanguageColor(lang: string): string {
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
            <!-- Header -->
            <div class="flex items-center justify-between">
              <a
                class="card-title link link-hover"
                href={repository.url}
                target="_blank"
              >
                {repository.name}
              </a>
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
                      style:background-color={getLanguageColor(lang)}
                      style:width="{value}%"
                    ></div>
                  {/each}
                </div>

                <!-- Labels -->
                <div class="flex flex-wrap gap-3 mt-2 text-sm">
                  {#each Object.entries(repository.languages).slice(0, 3) as [lang, value]}
                    <div class="flex items-center gap-1">
                      <span
                        class={`w-3 h-3 rounded-full`}
                        style="color: ${getLanguageColor(lang)};"
                      ></span>
                      <div style:color={getLanguageColor(lang)}>
                        {lang}
                        {Math.round(value)}%
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
</main>

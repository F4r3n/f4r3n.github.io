<script lang="ts">
  import "../app.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  let { children } = $props();
  interface Menu {
    name: string;
    path: string;
  }

  let nav: Menu[] = [
    { name: "About", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "CV", path: "/cv.pdf" },
  ];

  let currentNav = $derived(nav.find((menu) => menu.path == page.route.id));
</script>

<main class="h-screen flex">
  <!-- Left menu -->
  <aside class="w-48 bg-base-200 p-4">
    <ul class="menu rounded-box">
      {#each nav as n, i}
        <li>
          <button
            class="btn btn-ghost justify-start w-full"
            class:btn-active={currentNav?.name === n.name}
            onclick={() => {
              goto(n.path);
            }}
          >
            {n.name}
          </button>
        </li>
      {/each}
    </ul>
  </aside>
  <section class="flex-1 p-6">
    {@render children()}
  </section>
</main>

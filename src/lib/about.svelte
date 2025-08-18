<script>
  import devImage from "$lib/assets/dev_2.jpg";
  const linkedinURL =
    "https://www.linkedin.com/in/guillaume-kotulski-008a11103/";
</script>

<main class="min-h-screen w-full">
  <div class="flex flex-col md:flex-row h-full">
    <!-- Left half -->
    <img
      src={devImage}
      class="md:w-1/2 h-64 md:h-full object-cover object-center"
      alt="Developer"
    />

    <!-- Right half -->
    <div class="md:w-1/2 flex flex-col px-5 py-6">
      <h1 class="text-xl font-semibold uppercase mt-2 mb-4">
        Guillaume Kotulski
      </h1>
      <p class="leading-8 text-left whitespace-pre-line">
        7 years of experience as a Software Engineer But how did I get there?...
        I learnt to code in high school. Back then, I used to write my code with
        a pen & paper during lessons and after school I transferred all of it to
        my computer. Since then, my passion for new technologies has never run
        out! I always have new ideas to implement, new articles to read. All the
        things I learn I am always eager to share it with friends and
        colleagues. Outside of work I am a passionate cyclist. You can find me
        learning Japanese, coding on <a
          class="text-blue-600 hover:underline"
          href="/projects">personal projects</a
        >, discovering new board games! Feel free to reach out on
        <a
          href={linkedinURL}
          target="_blank"
          class="text-blue-600 hover:underline">LinkedIn</a
        >
      </p>
    </div>
  </div>
</main>

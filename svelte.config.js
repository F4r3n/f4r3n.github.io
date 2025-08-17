import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import * as fs from "node:fs";
import { Octokit } from "@octokit/core";
import "dotenv/config";

//https://api.github.com/users/f4r3n/repos
//https://api.github.com/repos/f4r3n/Sudoku/languages

const octokit = new Octokit({
  auth: process.env.GITHUB_API,
});
async function fetchGithubRepositories(inOwner) {
  return await octokit.request("GET /users/{owner}/repos", {
    owner: inOwner,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

async function fetchGithubLanguages(inOwner, inRepo) {
  const languages = await octokit.request(
    "GET /repos/{owner}/{repo}/languages",
    {
      owner: inOwner,
      repo: inRepo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  console.log(languages.data);
  let sum = 0;
  let new_languages = {};
  for (let [language, value] of Object.entries(languages.data)) {
    sum += value;
  }

  for (let [language, value] of Object.entries(languages.data)) {
    new_languages[language] = (value / sum) * 100;
  }
  return new_languages;
}

async function formatRepositories(inRespositories) {
  let repos = {};

  for (let repo of inRespositories) {
    let result = await fetchGithubLanguages("f4r3n", repo.name);

    repos[repo.name] = {
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      name: repo.name,
      private: repo.private,
      fork: repo.fork,
      size: repo.size,
      description: repo.description,
      url: repo.html_url,
      languages: result,
    };
  }
  return repos;
}
const dev = process.argv.includes("dev");
const force = false;
if (!dev || force) {
  const path = "./src/lib/assets/repositories.json";
  console.log("Launch");

  if (!fs.existsSync(path) || force) {
    console.log("Build repositories file");

    const repositories = (await fetchGithubRepositories("f4r3n")).data;
    let repos = await formatRepositories(repositories);
    fs.writeFileSync(
      "./src/lib/assets/repositories.json",
      JSON.stringify(repos)
    );
  }
}

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
  },
};

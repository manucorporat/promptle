import { component$, Slot } from "@builder.io/qwik";
import { DocumentHead, loader$ } from "@builder.io/qwik-city";
import { getDay, getPromptOfTheDay } from "~/logic";

export const promptOfTheDay = loader$(() => {
  const a = getPromptOfTheDay();
  return {
    id: a.prompt_id,
    day: getDay(),
  };
});

export default component$(() => {
  const a = promptOfTheDay.use();

  return (
    <>
      <Slot />
      <footer>
        Made with ♡ by {a.value.id}
        <a href="https://www.builder.io/" target="_blank">
          @manucorporat
        </a>{" "}
        using{" "}
        <a href="https://qwik.builder.io/" target="_blank">
          Qwik
        </a>
      </footer>
    </>
  );
});

export const head: DocumentHead = () => {
  const creator = "@promptle";
  const title = "Promptle";
  const description = "Can you Guess the AI prompt?";
  const image = "https://promptle.art/twitter.jpg";
  return {
    title: "Promptle - Can you Guess the AI prompt?",
    meta: [
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      { name: "twitter:site", content: creator },
      { name: "twitter:creator", content: creator },
      { name: "twitter:title", content: title },
      { name: "og:title", content: title },
      { name: "twitter:description", content: description },
      { name: "og:description", content: description },
      { name: "description", content: description },

      {
        name: "keywords",
        content: "prompts,guessing,game,worldle,ai,stable difussion,ai,ml,qwik",
      },
      { name: "author", content: "Manu Martinez-Almeida" },
      {
        name: "twitter:image",
        content: image,
      },
      {
        name: "og:image",
        content: image,
      },
    ],
  };
};

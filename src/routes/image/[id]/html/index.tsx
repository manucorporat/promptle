import { component$ } from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import { getImageURL, getTwitterImageURL } from "~/logic";
import { mainBox, playGameButton } from "~/routes/index.css";
import { usePromptOfTheDay } from "~/routes/layout";
import { descriptionP, prompImage } from "./index.css";

export default component$(() => {
  const loc = useLocation();
  const prompt = usePromptOfTheDay();

  return (
    <main class={mainBox}>
      <h1>Promptle</h1>
      <p class={descriptionP}>
        At Promotle, a new AI image challenge is released every day. You will
        have to figure out which prompts were used to generate the proposed
        image.
      </p>
      <img class={prompImage} src={getImageURL(loc.params.id)} />

      <a href={`/game/${prompt.value.id}/`} class={playGameButton}>
        Play Game Of The Day #{prompt.value.day}
      </a>
    </main>
  );
});

export const head: DocumentHead = ({ params }) => {
  const title = "Promptle Of The Day";
  const image = `https://promptle.art${getTwitterImageURL(params.id)}`;
  return {
    title,
    meta: [
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      { name: "twitter:title", content: title },
      { name: "og:title", content: title },
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

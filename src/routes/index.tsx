import { component$ } from "@builder.io/qwik";
import {
  decriptionP,
  mainBox,
  mainBoxContent,
  mainHeaderBox,
  mainHeaderText,
  mainImg,
  playGameButton,
} from "./index.css";
import { usePromptOfTheDay } from "./layout";
import Rules from "~/rules.md";
import Intro from "~/intro.md";
import HeaderImage from "~/media/header.jpg?jsx";

export default component$(() => {
  const prompt = usePromptOfTheDay();
  return (
    <main class={mainBox}>
      <div class={mainHeaderBox}>
        <HeaderImage alt="Promptle Logo Image" class={mainImg} />
        <div class={mainHeaderText}>
          <h1>Promptle</h1>
          <p class={decriptionP}>
            At Promptle, a new AI image challenge is released every day. Can you
            guess which prompts were used to generate the proposed image?
          </p>
        </div>
      </div>
      <div class={mainBoxContent}>
        <Intro />
        <a href={`/game/${prompt.value.id}/`} class={playGameButton}>
          Play Game Of The Day #{prompt.value.day}
        </a>
        <Rules />
        Follow <a href="https://twitter.com/promptle">@promptle</a> Twitter or
        join our newsletter to get daily challenges:
      </div>
    </main>
  );
});

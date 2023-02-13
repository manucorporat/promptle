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
import { promptOfTheDay } from "./layout";
import Rules from "~/rules.md";
import Intro from "~/intro.md";
import image from "../../public/header.jpg";

export default component$(() => {
  const prompt = promptOfTheDay.use();
  return (
    <main class={mainBox}>
      <div class={mainHeaderBox}>
        <img
          alt="Promptle Logo Image"
          width={650}
          height={579}
          class={mainImg}
          src={image}
        />
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

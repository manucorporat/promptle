import { component$ } from "@builder.io/qwik";
import { getImageURL, processFailed } from "~/logic";
import { tweetBox, tweetImg, tweetLink, tweetMessage } from "./tweet.css";

export interface TweetProps {
  correct: string[];
  prompId: string;
}

export const Tweet = component$<TweetProps>((props) => {
  const tweet = generateTweet(props.correct);
  const tweetWithImage = `${tweet}\n\nhttps://promptle.art/image/${props.prompId}/html`;
  const tweetURL = new URL("https://twitter.com/intent/tweet");
  tweetURL.searchParams.set("text", tweetWithImage);
  return (
    <>
      <div class={tweetBox}>
        <h2>
          <a
            class={tweetLink}
            href={tweetURL.href}
            target="_blank"
            rel="noopener"
          >
            Tweet your promptle
          </a>
        </h2>
        <div>
          <div class={tweetMessage}>{tweet}</div>
          <img class={tweetImg} src={getImageURL(props.prompId)}></img>
        </div>
      </div>
    </>
  );
});

export const generateTweet = (correct: string[]) => {
  return (
    correct
      .map((word) => {
        return processFailed(word)
          .map(({ state }) => {
            if (state === 0) return "🟩";
            if (state === 1) return "🟨";
            if (state === 2) return "🟥";
          })
          .join("");
      })
      .join("\n") + `\nby @promptle`
  );
};

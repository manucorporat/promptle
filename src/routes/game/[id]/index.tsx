import {
  $,
  component$,
  QwikKeyboardEvent,
  useClientEffect$,
  useSignal,
} from "@builder.io/qwik";
import { action$, Form, loader$, z, zod$ } from "@builder.io/qwik-city";
import { Tweet } from "~/components/tweet/tweet";
import {
  computeFailed,
  getClue,
  getImageURL,
  getPromptData,
  processFailed,
  processPromp,
} from "~/logic";
import {
  clueContains,
  clueCorrect,
  clueInput,
  clueItem,
  clueList,
  clueWrong,
  correctList,
  enterButton,
  gameBox,
  gameContentPanel,
  gameImage,
  gameImagePanel,
  gameTitle,
  remainingItem,
  rulesBox,
} from "./index.css";
import Rules from "~/rules.md";
import { animate, spring } from "motion";

export const useCurrentGame = loader$(({ params, redirect }) => {
  const id = params["id"];
  const promp = getPromptData(id);
  if (!promp) {
    throw redirect(302, "/");
  }
  const modifiers = processPromp(promp.modifiers);
  return {
    id: promp.prompt_id,
    image: getImageURL(promp.prompt_id),
    clue: getClue(modifiers[0]),
    total: modifiers.map((a) => a.length),
  };
});

export const useGameAction = action$(
  ({ step, lives, guesses, tries }, { params, redirect }) => {
    const id = params["id"];
    const promp = getPromptData(id as string);
    if (!promp) {
      throw redirect(302, "/");
    }
    const modifiers = processPromp(promp.modifiers);
    const correct = modifiers[step];
    const guess = guesses.join("").toLowerCase();
    if (guess === correct) {
      const done = modifiers.length === step + 1;
      return {
        tries: [...tries, correct],
        step: step + 1,
        done,
        clue: done ? "" : getClue(modifiers[step + 1]),
        lives,
        correct: true,
      };
    }

    const newFailed = computeFailed(guess, correct);
    return {
      tries: [...tries, newFailed],
      step: step,
      clue: getClue(modifiers[step]),
      done: modifiers.length === step,
      lives: lives - 1,
      correct: false,
    };
  },
  zod$({
    step: z.coerce.number(),
    lives: z.coerce.number(),
    tries: z.array(z.string()).default([]),
    guesses: z.array(z.string()),
  })
);

export default component$(() => {
  const game = useCurrentGame();
  const action = useGameAction();

  const currentClue = action.value?.clue ?? game.value.clue;
  const lives = action.value?.lives ?? 5;
  const done = lives === 0 || action.value?.done === true;
  const step = action.value?.step ?? 0;
  const clueLineRef = useSignal<HTMLLIElement>();
  let first = true;

  // Ensure the first input is focused
  useClientEffect$(({ track }) => {
    track(() => [game.value]);
    const firstText = clueLineRef.value?.querySelector(
      "input[type=text]"
    ) as HTMLInputElement | null;
    if (firstText) {
      firstText.focus();
    }
  });

  const keyUp = $((ev: QwikKeyboardEvent<HTMLLIElement>, ol: HTMLElement) => {
    const allInputs = Array.from(
      ol.querySelectorAll("input[type=text]")
    ) as HTMLInputElement[];
    const target = ev.target as HTMLInputElement;
    const index = allInputs.indexOf(target);
    if (index >= 0) {
      const key = ev.key;

      let nextIndex = -1;

      if (key === "Backspace" || key === "Delete") {
        target.value = "";
        nextIndex = index - 1;
      }
      if (nextIndex >= 0 && nextIndex < allInputs.length) {
        setTimeout(() => {
          allInputs[nextIndex].focus();
        }, 20);
      }
    }
  });

  const keyPressed = $(
    (ev: QwikKeyboardEvent<HTMLLIElement>, ol: HTMLElement) => {
      const allInputs = Array.from(
        ol.querySelectorAll("input[type=text]")
      ) as HTMLInputElement[];
      const target = ev.target as HTMLInputElement;
      const index = allInputs.indexOf(target);
      if (index >= 0) {
        const key = ev.key;

        let nextIndex = -1;

        if (key === "Backspace" || key === "Delete") {
          target.value = "";
          nextIndex = index - 1;
        } else if (/^[a-z]$/.test(key.toLowerCase())) {
          nextIndex = index + 1;
        }
        if (nextIndex >= 0 && nextIndex < allInputs.length) {
          setTimeout(() => {
            allInputs[nextIndex].focus();
          }, 20);
        }
      }
    }
  );
  return (
    <div>
      <h1 class={gameTitle}>Promptle of the Day</h1>
      <main class={gameBox}>
        <div class={gameImagePanel}>
          {done && (
            <Tweet
              prompId={game.value.id}
              correct={action.value!.tries!}
            ></Tweet>
          )}
          {!done && <img class={gameImage} src={game.value.image} />}
        </div>

        <div class={gameContentPanel}>
          {done && <h2>Good play! ✨</h2>}
          <Form
            action={action}
            spaReset
            onSubmitCompleted$={(ev) => {
              if (!(ev.detail.value as any).correct) {
                animate(
                  clueLineRef.value!,
                  {
                    // ke
                    x: [-5, 5, -5, 5, 0],
                  },
                  spring()
                ).play();
              } else {
                animate(
                  clueLineRef.value!,
                  {
                    scale: [1.8, 1],
                    opacity: [0, 1],
                  },
                  spring()
                ).play();
              }
            }}
          >
            <input type="hidden" name="step" value={step} />
            <input type="hidden" name="lives" value={lives} />
            {action.value?.tries?.map((a) => (
              <input key={a} type="hidden" name="tries[]" value={a} />
            ))}

            <ol class={correctList}>
              {action.value?.tries?.map((guess) => {
                return (
                  <li key={guess}>
                    {processFailed(guess).map(({ v, state }) => {
                      return (
                        <span
                          class={{
                            [clueItem]: true,
                            [clueWrong]: state === 2,
                            [clueContains]: state === 1,
                            [clueCorrect]: state === 0,
                          }}
                        >
                          {v}
                        </span>
                      );
                    })}
                  </li>
                );
              })}
              {!done && (
                <>
                  <li
                    key="form-li"
                    ref={clueLineRef}
                    class={clueList}
                    onKeyUp$={keyUp}
                    onKeyPress$={keyPressed}
                  >
                    {Array.from(currentClue).map((a) => {
                      const jsx = (
                        <span class={clueItem}>
                          {a === "*" ? (
                            <input
                              class={clueInput}
                              width={1}
                              onFocus$={(_, el) => {
                                (el as HTMLInputElement).select();
                              }}
                              placeholder="*"
                              type="text"
                              name="guesses[]"
                              minLength={1}
                              maxLength={1}
                              required
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              autoFocus={first}
                              disabled={action.isRunning}
                            />
                          ) : (
                            <>
                              <input type="hidden" name="guesses[]" value={a} />
                              {a}
                            </>
                          )}
                        </span>
                      );
                      if (a === "*") {
                        first = false;
                      }
                      return jsx;
                    })}
                    <button class={enterButton} disabled={action.isRunning}>
                      👈 ENTER
                    </button>
                  </li>
                  {game.value.total.slice(step + 1).map((len) => (
                    <li class={remainingItem}>
                      {Array.from({ length: len }).map(() => (
                        <span class={clueItem}>{""}</span>
                      ))}
                    </li>
                  ))}
                </>
              )}
            </ol>
          </Form>
          {!done && <div>Remaining lives: {"❤️".repeat(lives)}</div>}
        </div>
      </main>
      <div class={rulesBox}>
        <Rules />
      </div>
    </div>
  );
});

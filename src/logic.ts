import data from "./prompts.json";

export const FILTER: Record<string, boolean | undefined> = {
  hiper: true,
  hyper: true,
  super: true,
  ultra: true,
  best: true,
  strikingly: true,
  wearing: true,
  inspired: true,
  high: true,
  like: true,
  very: true,
  really: true,
  such: true,
  without: true,
  with: true,
  legged: true,
};
export const processPromp = (modifiers: string[]) => {
  return Array.from(
    new Set(
      modifiers
        .map((a) => a.toLowerCase().replace(/\d/g, "").trim())
        .flatMap((a) => a.split(" "))
        .filter((a) => a.length >= 3 && !FILTER[a])
    )
  ).slice(0, 5);
};

export const computeFailed = (guess: string, correct: string) => {
  let output = "";
  const letters = new Set(Array.from(correct));
  for (let i = 0; i < correct.length; i++) {
    if (guess.charAt(i) === correct.charAt(i)) {
      output += guess.charAt(i);
    } else if (letters.has(guess.charAt(i))) {
      output += "~" + guess.charAt(i);
    } else {
      output += "^" + guess.charAt(i);
    }
  }
  return output;
};

export const getClue = (modifier: string) => {
  // Keep first and last letter
  const first = modifier[0];
  const last = modifier[modifier.length - 1];
  const regex = new RegExp(`[^${first}${last}]`, "g");
  return modifier.replace(regex, "*");
};
export const processFailed = (failed: string) => {
  const output = [];
  for (let i = 0; i < failed.length; i++) {
    const char = failed.charAt(i);
    if (char === "^") {
      i++;
      output.push({
        v: failed.charAt(i),
        state: 2,
      });
    } else if (char === "~") {
      i++;
      output.push({
        v: failed.charAt(i),
        state: 1,
      });
    } else {
      output.push({
        v: char,
        state: 0,
      });
    }
  }
  return output;
};

export const getPromptData = (id: string) => {
  return data.prompts.find((a) => a.prompt_id === id);
};

export const getDay = () => {
  const a = 24 * 60 * 60 * 1000;
  const index = Math.floor(Date.now() / a) - 19379;
  return index;
};

export const getPromptOfTheDay = () => {
  return data.prompts[getDay()];
};

export const getImageURL = (promptId: string) => {
  return `/image/${promptId}/original.png`;
};

export const getTwitterImageURL = (promptId: string) => {
  return `/image/${promptId}/twitter.png`;
};

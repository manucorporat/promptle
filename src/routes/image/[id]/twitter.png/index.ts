import { RequestHandler } from "@builder.io/qwik-city";
import { getPromptData } from "~/logic";

export const onGet: RequestHandler = async ({
  params,
  getWritableStream,
  headers,
  error,
  cacheControl,
}) => {
  const id = params.id;
  const prompt = getPromptData(id);
  if (!prompt) {
    throw error(404, `Prompt not found: ${id}`);
  }
  const url = `https://res.cloudinary.com/dj2aeodwk/image/fetch/w_1200/ar_2,c_crop/${prompt.generations[0].image_uri}`;
  const res = await fetch(url);
  res.headers.forEach((value, key) => {
    headers.append(key, value);
  });
  cacheControl("immutable");
  await res.body?.pipeTo(getWritableStream());
};

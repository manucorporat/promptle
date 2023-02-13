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
  const url = prompt.generations[0].image_uri;
  const req = await fetch(url);
  req.headers.forEach((value, key) => {
    headers.append(key, value);
  });
  cacheControl("immutable");
  await req.body?.pipeTo(getWritableStream());
};

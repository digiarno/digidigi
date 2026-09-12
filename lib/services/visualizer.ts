import { serverEnv } from "@/lib/env";

export type VisualizeRequest = {
  imageBase64: string;
  mimeType: string;
  prompt?: string;
};

export type VisualizeResult = {
  imageBase64: string;
  mimeType: string;
  mocked: boolean;
  provider: "replicate" | "mock";
};

const DEFAULT_PROMPT =
  "Photorealistic Finnish terrace enclosed with premium sliding glass walls, frameless and framed aluminum profiles, Scandinavian architecture, dusk lighting, keep original house and garden";

/**
 * Isolated visualizer adapter.
 * Plug in `import Replicate from "replicate"` when REPLICATE_API_TOKEN is present.
 * Target: Stable Diffusion / Flux inpainting of terrace photos.
 */
export async function visualizeTerrace(input: VisualizeRequest): Promise<VisualizeResult> {
  if (!serverEnv.replicateToken) {
    return mockVisualize(input);
  }

  const model =
    serverEnv.replicateModel ??
    "black-forest-labs/flux-dev-inpainting";

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serverEnv.replicateToken}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      version: model,
      input: {
        image: `data:${input.mimeType};base64,${input.imageBase64}`,
        prompt: input.prompt ?? DEFAULT_PROMPT,
      },
    }),
  });

  if (!response.ok) {
    console.warn("[visualizer] Replicate request failed, falling back to mock", response.status);
    return mockVisualize(input);
  }

  const payload = (await response.json()) as {
    output?: string | string[];
  };
  const output = Array.isArray(payload.output) ? payload.output[0] : payload.output;
  if (!output) {
    return mockVisualize(input);
  }

  const image = await fetch(output);
  const buffer = Buffer.from(await image.arrayBuffer());
  return {
    imageBase64: buffer.toString("base64"),
    mimeType: image.headers.get("content-type") ?? "image/png",
    mocked: false,
    provider: "replicate",
  };
}

async function mockVisualize(input: VisualizeRequest): Promise<VisualizeResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    imageBase64: input.imageBase64,
    mimeType: input.mimeType,
    mocked: true,
    provider: "mock",
  };
}

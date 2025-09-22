import "server-only";

import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-09-01";
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      // We disable the CDN whenever a token is supplied so previews and drafts stay fresh.
      useCdn: !token,
      perspective: token ? "previewDrafts" : "published"
    })
  : null;

import { createClient, type ClientConfig } from "@sanity/client";
import { apiVersion, dataset, projectId, token, useCdn } from "../env";

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published"
};

if (token) {
  config.token = token;
}

export const sanityClient = createClient(config);

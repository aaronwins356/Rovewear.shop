import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemas";

export default defineConfig({
  name: "grounded-living",
  title: "Grounded Living Studio",
  projectId,
  dataset,
  basePath: "/studio",
  schema,
  plugins: [deskTool(), visionTool({ defaultApiVersion: apiVersion })]
});

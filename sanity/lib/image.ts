import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./client";

export function urlForImage(source: Image) {
  return createImageUrlBuilder(sanityClient).image(source);
}

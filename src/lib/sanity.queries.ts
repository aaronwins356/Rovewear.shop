import { groq } from "next-sanity";

export const productCardFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  longDescription,
  price,
  currency,
  status,
  tags,
  popularity,
  rating,
  "categorySlugs": categories[]->slug.current,
  "heroImage": {
    "url": heroImage.asset->url,
    alt,
    "width": heroImage.asset->metadata.dimensions.width,
    "height": heroImage.asset->metadata.dimensions.height
  },
  "images": images[]{
    "url": asset->url,
    alt,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  },
  specs,
  variants[]{
    name,
    price,
    currency,
    sku
  },
  reviews[]{
    _id,
    name,
    rating,
    comment,
    createdAt
  }
`;

export const productsQuery = groq`*[_type == "product" && defined(slug.current)] | order(popularity desc) {
  ${productCardFields}
}`;

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  ${productCardFields}
}`;

export const categoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(orderRank asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "heroImage": {
    "url": heroImage.asset->url,
    alt,
    "width": heroImage.asset->metadata.dimensions.width,
    "height": heroImage.asset->metadata.dimensions.height
  }
}`;

export const marketingContentQuery = groq`*[_type == "marketingPage" && slug.current == "home"][0]{
  heroHeadline,
  heroSubheadline,
  heroCtaLabel,
  heroCtaHref,
  newsletterHeadline,
  newsletterSubheadline,
  "heroImage": {
    "url": heroImage.asset->url,
    alt,
    "width": heroImage.asset->metadata.dimensions.width,
    "height": heroImage.asset->metadata.dimensions.height
  },
  "featuredProductSlugs": featuredProducts[]->slug.current,
  "featuredCategorySlugs": featuredCategories[]->slug.current
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  currency,
  supportEmail,
  supportPhone,
  announcement,
  footerLinks[] {
    label,
    href
  }
}`;

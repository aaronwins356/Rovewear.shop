import { defineField, defineType } from "sanity";

export default defineType({
  name: "marketingPage",
  title: "Marketing Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubheadline", type: "text" }),
    defineField({ name: "heroCtaLabel", type: "string" }),
    defineField({ name: "heroCtaHref", type: "string" }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }]
    }),
    defineField({
      name: "featuredProducts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }]
    }),
    defineField({
      name: "featuredCategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }]
    }),
    defineField({ name: "newsletterHeadline", type: "string" }),
    defineField({ name: "newsletterSubheadline", type: "text" })
  ]
});

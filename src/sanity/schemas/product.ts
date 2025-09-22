import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "longDescription", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "price", type: "number", validation: (rule) => rule.required().positive() }),
    defineField({ name: "currency", type: "string", initialValue: "USD" }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["inStock", "lowStock", "preorder", "soldOut"] },
      initialValue: "inStock"
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }]
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }]
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string" }]
        }
      ]
    }),
    defineField({
      name: "specs",
      type: "object",
      fields: [
        { name: "lensWidth", type: "string" },
        { name: "bridgeWidth", type: "string" },
        { name: "templeLength", type: "string" },
        { name: "frameMaterial", type: "string" },
        { name: "lensMaterial", type: "string" },
        { name: "weight", type: "string" }
      ]
    }),
    defineField({
      name: "variants",
      type: "array",
      of: [
        defineField({
          name: "variant",
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "price", type: "number" },
            { name: "currency", type: "string" },
            { name: "sku", type: "string" }
          ]
        })
      ]
    }),
    defineField({
      name: "reviews",
      type: "array",
      of: [{ type: "reference", to: [{ type: "review" }] }]
    }),
    defineField({ name: "popularity", type: "number", initialValue: 0 })
  ]
});

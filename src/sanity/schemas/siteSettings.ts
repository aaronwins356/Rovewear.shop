import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "currency", type: "string", initialValue: "USD" }),
    defineField({ name: "supportEmail", type: "string" }),
    defineField({ name: "supportPhone", type: "string" }),
    defineField({ name: "announcement", type: "string" }),
    defineField({
      name: "footerLinks",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" }
          ]
        })
      ]
    })
  ]
});

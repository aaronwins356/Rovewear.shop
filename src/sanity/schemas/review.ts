import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "rating", type: "number", validation: (rule) => rule.required().min(1).max(5) }),
    defineField({ name: "comment", type: "text", rows: 3 }),
    defineField({ name: "createdAt", type: "datetime", initialValue: () => new Date().toISOString() })
  ]
});

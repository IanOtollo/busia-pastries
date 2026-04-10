import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "3-Tier Wedding Cake for Chebet Family"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cakes', value: 'cakes' },
          { title: 'Pastries', value: 'pastries' },
          { title: 'Breads', value: 'breads' },
          { title: 'Custom Orders', value: 'custom' },
          { title: 'Seasonal', value: 'seasonal' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'text',
      rows: 2,
      description: 'Short caption shown on hover',
    }),
    defineField({
      name: 'linkedProduct',
      title: 'Linked Product (optional)',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Link to a menu item — "Order This" button will go to that product page',
    }),
    defineField({
      name: 'featured',
      title: 'Feature in Homepage Gallery Teaser',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})

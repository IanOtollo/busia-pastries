import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from '@/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'clarepastries',
  title: 'Clare Pastries Studio',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            S.listItem()
              .title('Products')
              .icon(() => '🍰')
              .child(
                S.documentTypeList('product')
                  .title('All Products')
              ),
            S.listItem()
              .title('Gallery')
              .icon(() => '📸')
              .child(
                S.documentTypeList('galleryImage')
                  .title('Gallery Photos')
              ),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            ...S.documentTypeListItems().filter(
              (listItem) => !['product', 'galleryImage', 'siteSettings'].includes(listItem.getId()!)
            ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      initialValue: 'Clare Pastries',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
      initialValue: '+254724848228',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Busia Town, Kenya',
    }),
    defineField({
      name: 'deliveryFeeKes',
      title: 'Delivery Fee (KES)',
      type: 'number',
      initialValue: 100,
      description: 'Flat delivery fee charged at checkout',
    }),
    defineField({
      name: 'deliveryEstimate',
      title: 'Delivery Time Estimate',
      type: 'string',
      initialValue: '45–90 minutes',
    }),
    defineField({
      name: 'pickupEstimate',
      title: 'Pickup Ready Estimate',
      type: 'string',
      initialValue: '30–60 minutes',
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      description: 'Optional top-of-page banner (e.g. holiday hours, special offer)',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Banner', initialValue: false },
        { name: 'message', type: 'string', title: 'Banner Message' },
        { name: 'bgColor', type: 'string', title: 'Background Color', initialValue: '#2A1A0E' },
      ],
    }),
  ],
})

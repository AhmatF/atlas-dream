
import type { CollectionConfig } from 'payload';

const Leads: CollectionConfig = {
  slug: 'leads',
  admin: { useAsTitle: 'type' },
  access: {
    read: ({ req: { user } }) => !!user, // private
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
    create: () => true
  },
  fields: [
    { name: 'type', type: 'select', required: true, options: ['car','villa','concierge'] },
    { name: 'payloadJSON', type: 'json', required: true },
    { name: 'status', type: 'select', options: ['new','in-progress','closed'], defaultValue: 'new' },
    { name: 'source', type: 'select', options: ['web','whatsapp','call'], defaultValue: 'web' }
  ]
};

export default Leads;

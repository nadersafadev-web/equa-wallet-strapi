/**
 * transaction router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::transaction.transaction', {
  config: {
    create: {
      middlewares: ['api::transaction.owner-assign'],
    },
    update: {
      middlewares: ['api::transaction.owner-assign'],
    },
  },
})

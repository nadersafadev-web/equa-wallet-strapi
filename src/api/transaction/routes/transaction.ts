/**
 * transaction router
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreRouter('api::transaction.transaction', {
  config: {
    create: {
      middlewares: ['api::transaction.owner-assign'],
    },
    find: {
      middlewares: ['api::transaction.owner-filter'],
    },
    findOne: {
      middlewares: ['api::transaction.owner-filter'],
    },
    update: {
      middlewares: [
        'api::transaction.owner-filter',
        'api::transaction.owner-assign',
      ],
    },
    delete: {
      middlewares: ['api::transaction.owner-filter'],
    },
  },
})

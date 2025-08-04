/**
 * transaction controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::transaction.transaction',
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { data } = ctx.request.body

        // Handle the owner relation properly
        if (data.owner) {
          // If owner is a string ID, convert it to the proper relation format
          if (typeof data.owner === 'string') {
            data.owner = {
              connect: [data.owner],
            }
          }
          // If owner is already an object with connect/set, keep it as is
          else if (
            typeof data.owner === 'object' &&
            !data.owner.connect &&
            !data.owner.set
          ) {
            // If it's an object but not in the right format, assume it's an ID
            data.owner = {
              connect: [data.owner],
            }
          }
        }

        // Call the default create method
        const result = await strapi.entityService.create(
          'api::transaction.transaction',
          {
            data,
            populate: ['owner'],
          }
        )

        return result
      } catch (error) {
        ctx.throw(400, error.message)
      }
    },

    async update(ctx) {
      try {
        const { id } = ctx.params
        const { data } = ctx.request.body

        // Handle the owner relation properly
        if (data.owner) {
          // If owner is a string ID, convert it to the proper relation format
          if (typeof data.owner === 'string') {
            data.owner = {
              connect: [data.owner],
            }
          }
          // If owner is already an object with connect/set, keep it as is
          else if (
            typeof data.owner === 'object' &&
            !data.owner.connect &&
            !data.owner.set
          ) {
            // If it's an object but not in the right format, assume it's an ID
            data.owner = {
              connect: [data.owner],
            }
          }
        }

        // Call the default update method
        const result = await strapi.entityService.update(
          'api::transaction.transaction',
          id,
          {
            data,
            populate: ['owner'],
          }
        )

        return result
      } catch (error) {
        ctx.throw(400, error.message)
      }
    },
  })
)

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

        // Use Document Service instead of Entity Service
        const result = await strapi
          .documents('api::transaction.transaction')
          .create({
            data,
            populate: ['owner'],
          })

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

        // Use Document Service instead of Entity Service
        const result = await strapi
          .documents('api::transaction.transaction')
          .update({
            documentId: id,
            data,
            populate: ['owner'],
            filters: ctx.query.filters,
          })

        return result
      } catch (error) {
        ctx.throw(400, error.message)
      }
    },

    async findOne(ctx) {
      try {
        const { id } = ctx.params

        const result = await strapi
          .documents('api::transaction.transaction')
          .findOne({
            documentId: id,
            populate: ctx.query.populate || ['owner'],
            filters: ctx.query.filters,
            fields: ctx.query.fields as any,
            sort: ctx.query.sort as any,
            pagination: ctx.query.pagination as any,
          })

        return result
      } catch (error) {
        ctx.throw(error.status || 400, error.message)
      }
    },

    async find(ctx) {
      try {
        const { query } = ctx

        const result = await strapi
          .documents('api::transaction.transaction')
          .findMany({
            filters: query.filters,
            fields: query.fields as any,
            populate: query.populate || ['owner'],
            sort: query.sort as any,
            pagination: query.pagination as any,
          })

        return result
      } catch (error) {
        ctx.throw(400, error.message)
      }
    },

    async delete(ctx) {
      try {
        const { id } = ctx.params

        const deleted = await strapi
          .documents('api::transaction.transaction')
          .delete({
            documentId: id,
            filters: ctx.query.filters,
          })

        if (deleted.entries.length === 0) {
          ctx.throw(404, 'Transaction not found')
        }

        return deleted
      } catch (error) {
        ctx.throw(error.status || 400, error.message)
      }
    },
  })
)

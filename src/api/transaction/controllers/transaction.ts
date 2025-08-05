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

        const result = await strapi
          .documents('api::transaction.transaction')
          .create({
            data,
            populate: ['owner'],
          })

        return result
      } catch (error) {
        const status = error.status || 400
        const message = error.message || 'Failed to create transaction'
        ctx.throw(status, message)
      }
    },

    async update(ctx) {
      try {
        const { id } = ctx.params
        const { data } = ctx.request.body

        // First find the transaction to verify ownership
        const existingTransaction = await strapi
          .documents('api::transaction.transaction')
          .findOne({
            documentId: id,
            populate: ['owner'],
            filters: ctx.query.filters,
          })

        if (
          !existingTransaction ||
          existingTransaction.owner.documentId !== ctx.state.user.documentId
        ) {
          ctx.throw(403, 'You are not authorized to update this transaction')
        }

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
        const status = error.status || 400
        const message = error.message || 'Failed to update transaction'
        ctx.throw(status, message)
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
        const status = error.status || 400
        const message = error.message || 'Failed to find transaction'
        ctx.throw(status, message)
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
        const status = error.status || 400
        const message = error.message || 'Failed to find transactions'
        ctx.throw(status, message)
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
        const status = error.status || 400
        const message = error.message || 'Failed to delete transaction'
        ctx.throw(status, message)
      }
    },
  })
)

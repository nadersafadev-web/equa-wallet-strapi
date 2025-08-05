/**
 * `owner-assign` middleware
 */

import type { Core } from '@strapi/strapi'

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.state.user) {
      ctx.query.filters = {
        ...((ctx.query.filters as any) ?? {}),
        owner: {
          documentId: {
            $eq: ctx.state.user.documentId,
          },
        },
      }
    }

    await next()
  }
}

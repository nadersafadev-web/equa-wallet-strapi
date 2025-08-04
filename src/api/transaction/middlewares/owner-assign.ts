/**
 * `owner-assign` middleware
 */

import type { Core } from '@strapi/strapi'

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    if (ctx.state.user && ctx.request.body.data) {
      ctx.request.body.data.owner = ctx.state.user.documentId
    }
    await next()
  }
}

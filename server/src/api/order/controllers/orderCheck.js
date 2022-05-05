module.exports = {
    async check(ctx) {
        return await strapi.calculatePrice(ctx.params.id, ctx.params.quantity)
    },
};
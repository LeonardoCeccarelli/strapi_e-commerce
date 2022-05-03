module.exports = {
    async check(ctx) {
        const product = await strapi.db.query('api::product.product').findOne({
            where: { id: ctx.params.id },
            populate: { category: true, user: true },
        });

        // Ritorno se la chiamata non va a buon fine
        if (!product) return

        // Calcolo prezzo al momento dell'acquisto
        const price = product.price
        const scountOnPurchase = product.scount ? product.scount : 0
        let priceOnPurchase = ""

        if (scountOnPurchase) {
            const totalScount = price / 100 * scountOnPurchase
            priceOnPurchase = price - totalScount
        } else {
            priceOnPurchase = price
        }

        return {
            priceOnPurchase,
            scountOnPurchase
        }
    },
};
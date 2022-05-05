module.exports = {
    async check(ctx) {
        const products = await strapi.db.query('api::product.product').findMany({
            where: { id: JSON.parse(ctx.params.id) },
            populate: { category: true, user: true },
        });

        const dataResponse = []
        let totPrice = 0
        const quantities = JSON.parse(ctx.params.quantity)
        index = 0
        products.forEach(item => {
            // Calcolo quantità prodotto
            const quantity = quantities[index]

            // Calcolo dati prezzo sconto e prezzo finale dei vari prodotti
            const normalPrice = item.price
            const scount = item.scount ? item.scount : 0
            let finalPrice = normalPrice - (normalPrice / 100 * scount)
            // Lo moltiplico per la quantità
            finalPrice = finalPrice * quantity
            finalPrice = parseFloat(finalPrice.toFixed(2))

            // Calcolo prezzo totale
            totPrice = totPrice + finalPrice
            totPrice = parseFloat(totPrice.toFixed(2))

            dataResponse.push({
                title: item.name,
                normalPrice,
                scount,
                finalPrice,
                quantity
            })
            index++
        });
        return {
            data: dataResponse,
            totPrice
        }
    },
};
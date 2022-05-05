'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.calculatePrice = async (productsId, quantityId) => {
      const products = await strapi.db.query('api::product.product').findMany({
        where: { id: JSON.parse(productsId) },
        populate: { category: true, user: true },
      });
      const quantities = JSON.parse(quantityId)
      const dataResponse = []
      let totPrice = 0
      products.forEach((item, index) => {
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
      });
      return {
        data: dataResponse,
        totPrice
      }
    }
  },
};

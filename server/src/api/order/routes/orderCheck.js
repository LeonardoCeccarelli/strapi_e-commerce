module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/orders/check/:id',
            handler: 'order-check.check',
        },
    ]
}
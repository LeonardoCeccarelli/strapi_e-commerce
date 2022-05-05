module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/orders/check/:id/:quantity',
            handler: 'order-check.check',
        },
    ]
}
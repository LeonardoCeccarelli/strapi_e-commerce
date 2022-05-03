import { createRouter, createWebHistory } from 'vue-router'

//Importazione delle pagine .vue
import Home from "../views/Home.vue"
import GuProdShow from "../views/guest/products/Show.vue"
import Login from "../views/guest/Login.vue"
import Register from "../views/guest/Register.vue"
import AdDashboard from "../views/admin/Dashboard.vue"
import Chart from "../views/admin/Chart.vue"
import AdOrders from "../views/admin/orders/Orders.vue"
import AdCreateOrders from "../views/admin/orders/Create.vue"
import AdShowOrders from "../views/admin/orders/Show.vue"
import AdProdShow from "../views/admin/products/Show.vue"
import AdProdCreate from "../views/admin/products/Create.vue"
import AdProdEdit from "../views/admin/products/Edit.vue"

//Importazione middleware di autenticazione
import auth from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Route per chiunque arrivi sulla pagina che mostra i prodotti
    {
      path: '/',
      name: 'home',
      component: Home
    },
    //Route per guest per la SOLA VISUALIZZAZIONE dei prodotti
    {
      path: '/guest/:id/show',
      name: 'guestShowProduct',
      component: GuProdShow
    },
    //Route di arrivo se il prodotto non viene trovato
    {
      path: '/guest/*/show',
      name: 'guestShowProductNotFound',
      component: Home
    },
    //Route Autenticazione utente
    {
      path: '/guest/login',
      name: 'login',
      component: Login
    },
    //Route registrazione utente
    {
      path: '/guest/register',
      name: 'register',
      component: Register
    },
    //Route di arrivo dopo che un utente ha effettuato login/register
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: AdDashboard,
      meta: {
        middleware: auth
      }
    },
    // Route di arrivo per visualizzare prodotti nel carrello ripresi dal localstorage
    {
      path: '/admin/chart',
      name: 'chart',
      component: Chart,
      meta: {
        middleware: auth
      }
    },
    //Route che mostra gli ordini di un utente registrato
    {
      path: '/admin/orders',
      name: 'orders',
      component: AdOrders,
      meta: {
        middleware: auth
      }
    },
    // Route per creare un nuovo ordine
    {
      path: '/admin/orders/new',
      name: 'createOrders',
      component: AdCreateOrders,
      meta: {
        middleware: auth
      }
    },
    // Route per visualizzare singolo ordine
    {
      path: '/admin/orders/:id/show',
      name: 'showOrders',
      component: AdShowOrders,
      meta: {
        middleware: auth
      }
    },
    //Route che mostra i dettagli di un prodotto appartenente SOLO all'utente
    {
      path: '/admin/product/:id/show',
      name: 'showProduct',
      component: AdProdShow,
      meta: {
        middleware: auth
      }
    },
    //Route di arrivo se non viene trovato l'id di nessun prodotto
    {
      path: '/admin/product/*/show',
      name: 'showProductNotFound',
      component: AdDashboard,
      meta: {
        middleware: auth
      }
    },
    //Route per la creazione di un nuovo prodotto
    {
      path: '/admin/product/new',
      name: 'createProduct',
      component: AdProdCreate,
      meta: {
        middleware: auth
      }
    },
    //Route per modificare un determinato prodotto
    {
      path: '/admin/product/:id/edit',
      name: 'editProduct',
      component: AdProdEdit,
      meta: {
        middleware: auth
      }
    },
    //Route di arrivo se non viene trovato l'id di nessun  prodotto
    {
      path: '/admin/product/*/edit',
      name: 'editProductNotFound',
      component: AdDashboard,
      meta: {
        middleware: auth
      }
    },
    //Route di arrivo se non viene trovato nessun url inserito da un utente
    {
      path: "/*",
      name: "homeNotFound",
      component: Home
    }
  ]
})

// Crea una `nextMiddleware()` funzione che non solo
// esegue la callback di default `next()` ma fa partire
// anche la successiva funzione di middleware.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // Se non esiste nessuna funzione di middleware,
  // verra richiamata la funzione di callback next()
  // che bloccheà il codice e permetterà a vue-router di
  // gestire normalmente la rotta.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Eseguo prima la funzione di callback predefinita di Vue router next()
    context.next(...parameters);
    // Eseguo la successiva funzione di middleware con una nuova callback
    // `nextMiddleware()`.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router

import { createApp } from 'vue'
import App from './App.vue'

//Import di Axios per chiamate Api
import axios from "axios"
import VueAxios from "vue-axios"

//Import Vue-router per gestire le rotte delle varie pagine
import router from './router'

//import CSS di Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

//Import JS di Bootstrap 5
import "bootstrap/dist/js/bootstrap.js"

app.use(VueAxios, axios)
app.use(router)

app.mount('#app')

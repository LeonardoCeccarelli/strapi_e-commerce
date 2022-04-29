<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{name: 'home'}"
      >E-Commerce</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
      >
        <!-- Utente loggato -->
        <ul
          v-if="isLogged"
          class="navbar-nav"
        >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Ciao, {{ user.username }}
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li><a
                  class="dropdown-item"
                  href="#"
                >Dashboard</a></li>
              <li><a
                  class="dropdown-item"
                  href="#"
                >I Miei rdini</a></li>
              <li><a
                  class="dropdown-item"
                  href="#"
                >Nuovo prodotto</a></li>
            </ul>
          </li>
        </ul>
        <!-- Utente non loggato -->
        <ul
          v-else
          class="navbar-nav"
        >
          <li class="nav-item">
            <router-link
              class="nav-link"
              aria-current="page"
              :to="{name: 'login'}"
            >Login</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{name: 'register'}"
            >Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLogged: false,
      userData: {
        typeof: Object,
        default: () => ({}),
      },
    };
  },
  methods: {},
  computed: {
    setUser() {
      if (localStorage.getItem("jwt"))
        this.userData = localStorage.getItem("user");
    },
  },
  mounted() {
    this.setUser;
  },
};
</script>

<style>
</style>
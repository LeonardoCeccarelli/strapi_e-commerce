<template>
  <div>
    <h1>Sezione Dashboard</h1>
    <h3>Benvenuto {{ userData.username }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {},
      jwt: "",
    };
  },
  methods: {},
  mounted() {
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.jwt = localStorage.getItem("jwt");
  },
};
</script>

<style>
</style>
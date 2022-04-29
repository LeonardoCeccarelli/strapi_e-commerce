<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar></Navbar>
    <RouterView />
  </div>
</template>

<style>
</style>

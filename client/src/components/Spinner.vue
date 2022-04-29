<template>
  <div class="spinner_container">
    <div
      class="spinner-border loader"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner_container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}
</style>
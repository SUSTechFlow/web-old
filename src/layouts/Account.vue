<template lang="pug">
v-content.fill-height.bkg
  v-container.fill-height(
    fluid
  )
    v-row(
      align="center"
      justify="center"
    )
      v-col(
        xs="12"
        sm="8"
        md="4"
      )
        router-view
</template>
<style lang="stylus" scoped>
.bkg
  background-image: url('~@/assets/bg_account.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100%;
  width: 100%;
.fill-height
  height: 100%
</style>

<template>
    <div>
        <button @click='loginSystem'>login</button>
    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  method：｛
    loginSystem（）｛
      const self = this；
      this.$gl_ajax（｛
      url：'/login'，
      method：'post'，
      data：｛… self.loginData｝，
      success（res）｛
       self.$store.commit（'types.LOGIN'）
       self.message（'login success'）
       ｝，
       error（err）｛
       ｝
      
    ｝
  ｝
};
</script>

<style>
</style>

<template>
    <div>
        <button @click='loginSystem'>login</button>
    </div>
</template>

<script>
import * as types from "../store/types.js";
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    loginSystem() {
      const self = this;
      this.$gl_ajax({
        url: "/login",
        method: "post",
        data: { ...self.loginData },
        success(res) {
          if (res.data.status == "ok") {
            const token = res.data.jwt;
            self.$store.commit(types.LOGIN, token);
            self.message("login success");
            self.$router.push({
              path: "/admin"
            });
          }
        },
        error(err) {}
      });
    }
  }
};
</script>

<style>
</style>

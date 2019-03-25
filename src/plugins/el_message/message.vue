<template>
  <transition name="message-fade">
    <div v-if="visible" :class="wrapClasses" :style="styels">
        <Icon :iconType="type"></Icon>
        <span :class="[prefixCls+'-content']">
          {{message}}
        </span>
    </div>    
  </transition>
</template>

<script>
const prefixCls = "message";
import Icon from "../el_icon/index.js";

export default {
  name: "message",
  data() {
    return {
      visible: false,
      type: "info",
      message: "",
      duration: 1500,
      prefixCls: prefixCls
    };
  },
  components: {
    Icon: Icon
  },
  computed: {
    wrapClasses() {
      return [`${prefixCls}`, `${prefixCls}-${this.type}`];
    },
    styels() {
      return {
        zIndex: 9999
      };
    }
  },
  methods: {
    setTimer() {
      setTimeout(() => {
        this.close(); // 3000ms之后调用关闭方法
      }, this.duration);
    },
    close() {
      this.visible = false;
      setTimeout(() => {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el); // 从DOM里将这个组件移除
      }, 500);
    }
  },
  mounted() {
    this.setTimer(); // 挂载的时候就开始计时，3000ms后消失
  }
};
</script>

<style scoped>
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}
.message-fade-enter, .message-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}
.message {
  position: fixed;
  top: 30px;
  left: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  padding: 16px 24px 16px 8px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  background: #fff;
  line-height: 1;
  overflow: hidden;
}
.message-close {
  position: absolute;
  top: 25%;
  right: 10px;
  color: rgba(153, 152, 152, 0.774);
  cursor: pointer;
  font-size: 17px;
}
.message-close:hover {
  color: #0c0c0c;
}
.message-success {
  background-color: #fff;
  color: #19be6b;
}
.message-info {
  color: #2db7f5;
  background-color: #fff;
}
.message-warning {
  color: #f90;
  background-color: #fff;
}
.message-error {
  background-color: #fff;
  color: #ed4014;
}
.message-content {
  font-size: 14px;
}
</style>

<template>
  <input
    :class="{
    error:!isOk
  }"
    @blur="showTips"
    @input="dataChange"
    @keyup.enter="jump"
    class="input"
    type="text"
  />
</template>

<script>
export default {
  props: ['rule', 'err_message'],
  data() {
    return {
      isOk: true
    }
  },
  methods: {
    showTips() {
      if (!this.isOk) {
        this.$toast.fail(this.err_message)
      }
    },
    dataChange($event) {
      if (!$event.target.value) {
        this.isOk = true
      } else {
        var regex = new RegExp(this.rule)
        this.isOk = regex.test($event.target.value)
        this.$emit('input', $event.target.value)
      }
    },
    jump() {
      this.$emit('keyup')
    }
  }
}
</script>

<style lang="less" scoped>
.input {
  margin-bottom: 20/@vv;
  width: 100%;
  height: 38/@vv;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border: none;
  border-bottom: 1px solid #666;
  outline: none;
}
.error {
  border-color: red;
}
</style>

<template>
      <input 
        ref="inputField"
        type="number"
        id="ftext"
        class="base"
        v-bind="value"
        v-on:keyup="updateValue($event.target.value)"
        v-bind:placeholder="placeholder"
        :disabled="inputDisabled"
      >
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'InputNumber',
  props: ['value', 'placeholder'],
  data: function () {
    return {
      inputDisabled: true
    }
  },
  emits: ['inputUpdated'],
  methods: {
    updateValue: function (value) {
      this.$emit('inputUpdated', value);
    },
    resetInput: function () {
      this.$refs.inputField.value="";
    },
    setInputFieldDisabled: function() {
      this.inputDisabled=true;
    },
    setInputFieldActive: function() {
      this.inputDisabled=false;
      nextTick(() => {
        this.$refs.inputField.focus();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.base{
  text-align: center;
  width: 50vw;
  height: calc(2.5rem + 1vmin);
}
@media (max-width: 700px) {
  .base{
    width: 90vw;
    height: calc(2.5rem + 1vmin);
  }
}
</style>

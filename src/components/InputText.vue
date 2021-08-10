<template>
      <input 
        ref="inputField"
        type="text"
        id="ftext"
        class="base"
        v-model="value"
        placeholder="Your name..."
        :disabled="inputDisabled"
      >
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'InputText',
  data: function () {
    return {
      inputDisabled: false,
      value: null
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
  height: calc(5vh + 1vmin);
}
@media (max-width: 600px) {
  .base{
    width: 90vw;
    height: calc(6vh + 1vmin);
  }
}
</style>

<template>
      <input 
        ref="inputField"
        type="text"
        id="ftext"
        class="input"
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
.input{
  text-align: center;
  width: calc(20vw + 10vmin);
  height: calc(1.5vh + 1vmin);
  font-size: calc(0.5vw + 1vh + 1vmin);
}
</style>

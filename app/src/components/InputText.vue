<template>
    <input 
      ref="inputField"
      type="text"
      id="ftext"
      v-model="value"
      v-bind:placeholder="placeholder"
      :disabled="inputDisabled"
    >
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'InputText',
  props: {
    placeholder: {
      type: String,
    }
  },
  data: function () {
    return {
      inputDisabled: false,
      value: null
    }
  },
  emits: ['inputUpdated'],
  methods: {
    updateValue: function (value) {
      console.log(value);
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
</style>

<template>
  <button class="button" v-on:click="onClick"> 
    <h2><span>Start</span></h2>
  </button>
</template>

<script>

export default {
  name: 'StartButton',
  methods: {
    onClick: function () {
      this.$emit('clicked');
    }
  },
  emits: ['clicked']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  display: inline-block;
  border-radius: 5px;
  background-color: #00e16e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  padding: 2px;
  width: calc(20vw + 10vmin);
  transition: all 0.5s;
  cursor: pointer;
  margin: 2px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>

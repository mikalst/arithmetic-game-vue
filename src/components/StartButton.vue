<template>
  <button class="button input" v-on:click="onClick"> 
    <span>Start</span>
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
  padding: 1vh;
  width: calc(20vw + 10vmin);
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
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

.input{
  text-align: center;
  width: 50vw;
  height: calc(5vh + 1vmin);
  font-size: calc(2vw + 1vh + 1vmin);
}
@media (max-width: 600px) {
  .input{
    width: 90vw;
    height: calc(6vh + 1vmin);
    font-size: calc(2vw + 1vh + 1vmin);
  }
}
</style>

<template>
    <div class="base"> Solve: {{ problem }} </div>
</template>

<script>

export default {
  name: 'Problem',
  data: function() {
    return {
      'problem': null
    }
  },
  methods: {
    setNewProblem: function () {
      let operation = Math.floor(Math.random()*4);
      console.log(operation);
      let numB = 1+Math.ceil(Math.random()*100);
      if (operation == 0){
        let numA = 1+Math.ceil(Math.random()*100);
        this.problem = `${numA} + ${numB}:`;
        return numA + numB;
      }
      else if (operation == 1){
        let numA = 1+Math.ceil(Math.random()*100);
        this.problem = `${numA + numB} - ${numB}:`;
        return numA;
      }
      else if (operation == 2){
        let numA = 1+Math.ceil(Math.random()*12);
        this.problem = `${numA} x ${numB}:`;
        return numA * numB;
      }
      else if (operation == 3){
        let numA = 1+Math.ceil(Math.random()*12);
        this.problem = `${numA * numB} / ${numA}:`;
        return numB;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.base{
  font-size: calc(2vw + 1vh + 1vmin);
}
@media (max-width: 600px) {
  .base{
    font-size: calc(2vw + 1vh + 1vmin);
  }
}
</style>

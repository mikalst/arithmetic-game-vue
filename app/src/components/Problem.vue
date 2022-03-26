<template>
    <h1 class="is-size-3"> Solve: {{ problem }} </h1>
</template>

<script>

export default {
  name: 'ProblemComponent',
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
</style>

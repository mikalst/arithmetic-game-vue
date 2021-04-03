<template>
  <Input 
    ref="input"
    v-model="answer"
    :problem="problem"
    :solution="solution"
    :inputDisabled="inputDisabled"
    @answerUpdated="checkAnswer" />
  <Counter
    :correct="correct"/>
  <Timer
    ref="timer"
    @activeEnded="stop"
    :remainingSeconds="remainingSeconds"
  />
    <button v-on:click="start()">
      Start
    </button>
</template>

<script>
import Input from './components/Input.vue'
import Counter from './components/Counter.vue'
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Counter,
    Input,
    Timer
  },
  data: function() {
    return {
      numA: 0,
      numB: 0,
      problem: 0,
      answer: 0,
      solution: 1337,
      correct: 0,
      remainingSeconds: 5,
      inputDisabled: true
    }
  },
  methods: {
    checkAnswer: function (answer) {
      this.answer = answer;
      console.log(this.answer);
      console.log(this.solution);
      console.log(this.answer == this.solution);
      if (this.answer == this.solution) {
        this.answer="";
        this.correct++;
        this.setNewProblem();
      }
    },
    setNewProblem: function() {
      let operation = Math.floor(Math.random()*4);
      this.numB = Math.ceil(Math.random()*100);
      if (operation == 0){
        this.numA = Math.ceil(Math.random()*100);
        this.problem = `${this.numA} + ${this.numB}:`;
        this.solution = this.numA + this.numB;
      }
      else if (operation == 1){
        this.numA = Math.ceil(Math.random()*100);
        this.problem = `${this.numA + this.numB} - ${this.numB}:`;
        this.solution = this.numA;
      }
      else if (operation == 2){
        this.numA = Math.ceil(Math.random()*12);
        this.problem = `${this.numA} * ${this.numB}:`;
        this.solution = this.numA * this.numB;
      }
      else if (operation == 3){
        this.numA = Math.ceil(Math.random()*12);
        this.problem = `${this.numA * this.numB} / ${this.numB}:`;
        this.solution = this.numA;
      }
      this.$refs.input.resetInput();
    },
    stop: function() {
      this.$refs.input.setInputFieldDisabled();
      console.log("Game is over.");
    },
    start: function() {
      console.log("Game is starting.");
      this.$refs.timer.start();
      this.$refs.input.setInputFieldActive();
      this.setNewProblem();
    }
  },
  mounted: function () {
    this.setNewProblem();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

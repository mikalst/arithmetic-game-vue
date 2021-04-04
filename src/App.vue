<template>
  <input 
        ref="inputName"
        type="text"
        id="personId"
        v-bind="personId"
        placeholder="Your name..."
      >
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
    <button class="button" v-on:click="start()">
      <span>Start</span>
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
      problem: null,
      answer: 0,
      solution: 1337,
      correct: 0,
      remainingSeconds: 5,
      inputDisabled: true,
      personId: null
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
      console.log(operation);
      this.numB = 1+Math.ceil(Math.random()*100);
      if (operation == 0){
        this.numA = 1+Math.ceil(Math.random()*100);
        this.problem = `${this.numA} + ${this.numB}:`;
        this.solution = this.numA + this.numB;
      }
      else if (operation == 1){
        this.numA = 1+Math.ceil(Math.random()*100);
        this.problem = `${this.numA + this.numB} - ${this.numB}:`;
        this.solution = this.numA;
      }
      else if (operation == 2){
        this.numA = 1+Math.ceil(Math.random()*12);
        this.problem = `${this.numA} x ${this.numB}:`;
        this.solution = this.numA * this.numB;
      }
      else if (operation == 3){
        this.numA = 1+Math.ceil(Math.random()*12);
        this.problem = `${this.numA * this.numB} / ${this.numA}:`;
        this.solution = this.numB;
      }
      this.$refs.input.resetInput();
    },
    stop: async function() {
      this.$refs.input?.setInputFieldDisabled();
      console.log("Game is over.");
      await this.saveScore();
    },
    start: async function() {
      console.log("Game is starting.");
      this.$refs.timer.start();
      this.$refs.input.setInputFieldActive();
      this.setNewProblem();
      await this.fetchScore();
    },
    saveScore: async function() {
      console.log("Saving score...");
      const res = await fetch(
        process.env.VUE_APP_API_PATH+
        `postStatistics?person=${this.personId}&result=${this.correct}`,
        { method: 'POST' });
      console.log(res.status);
      console.log("Saved.");
    },
    fetchScore: async function() {
      console.log("Fetching score.");
      const res = await fetch(
        process.env.VUE_APP_API_PATH+`getStatistics?person=${this.personId}`);
      console.log(await res.json());
    }
  },
  mounted: function () { 
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

.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #00e16e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: calc(2vw + 2vh + 1vmin);
  padding: 2px;
  width: 25%;
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
</style>

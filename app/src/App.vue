<template class="app">
    <InputText 
        ref="inputIdentifier"
        v-model="personId"
        :placeholder="'Please enter your name ...'"
    />
  <Problem
    ref="problem" />
  <InputNumber 
    ref="inputAnswer"
    v-model="answer"
    :solution="solution"
    :inputDisabled="inputDisabled"
    :placeholder="''"
    @inputUpdated="checkAnswer" />
  <Counter
    :correct="correct"/>
  <Timer
    ref="timer"
    @activeEnded="stop"
    :remainingSeconds="remainingSeconds"
  />
  <StartButton @clicked="start" />
  <Table ref="stats"
    v-show="mostRecentStats"
    :title="'Your recent scores'"
    :showLink="true"
    :personId="personId"
    :stats="mostRecentStats"
  />
</template>
<script>


import InputNumber from './components/InputNumber.vue'
import InputText from './components/InputText.vue'
import Counter from './components/Counter.vue'
import Problem from './components/Problem.vue'
import StartButton from './components/StartButton.vue'
import Table from './components/Table.vue'
import Timer from './components/Timer.vue'


export default {
  name: 'App',
  components: {
    Counter,
    InputNumber,
    InputText,
    Problem,
    StartButton,
    Timer,
    Table
  },
  data: function() {
    return {
      answer: 0,
      solution: 1337,
      correct: 0,
      remainingSeconds: null,
      inputDisabled: true,
      personId: null,
      mostRecentStats: [],
      topStatsToday: []
    }
  },
  methods: {
    checkAnswer: function (answer) {
      this.answer = answer;
      if (process.env.NODE_ENV === "development") {
        console.log(`Answer: ${this.answer}, Solution: ${this.solution}`);
      }
      if (this.answer == this.solution) {
        this.answer="";
        this.correct++;
        this.setNewProblem();
      }
    },
    setNewProblem: function() {
      this.solution = this.$refs.problem?.setNewProblem();
      this.$refs.inputAnswer.resetInput();
    },
    stop: async function() {
      this.$refs.inputAnswer?.setInputFieldDisabled();
      console.log("Game is over.");
      if (this.personId) {
        await this.saveScore();
        await this.$refs.stats.fetchScore(this.personId, 30);
      }
    },
    start: async function() {
      console.log("Game is starting.");
      this.correct = 0;
      this.$refs.timer.start();
      this.$refs.inputAnswer?.setInputFieldActive();
      this.setNewProblem();
    },
    saveScore: async function() {
      console.log(`Saving score... for ${this.personId}`);
      const res = await fetch(
        process.env.VUE_APP_API_PATH+
        `postStatistics?person=${this.personId}&result=${this.correct}`,
        { method: 'POST' });
      console.log(res.status);
      console.log("Saved.");
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
  align-content: center;
  color: #2c3e50;
  margin-top: 1rem;
}

div, a{
  text-align: center;
  font-size: calc(1rem + 0.5vh);
}

input, button, a{
  text-align: center;
  width: 100%;
  height: calc(3rem + 1vmin);
  max-width: 50%;
  font-size: calc(1rem + 0.5vh);
}
@media (max-width: 768px) {
  input, button, a{
    max-width: 95%;
    
  }
}

.pTable {
  width: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 768px) {
  .pTable {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

button {
  border-radius: 5px;
  background-color: #00e16e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
}

button span {
  cursor: pointer;
  position: relative;
  transition: 0.5s;
}

button span:after {
  content: '\00bb';
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 25px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
  

</style>
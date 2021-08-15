<template class="app">
  <div>
    <InputText 
        ref="inputIdentifier"
        v-model="personId"
        :placeholder="'Please enter your name ...'"
    />
  </div>
  <div>
  <Problem
    ref="problem" />
  </div>
  <InputNumber 
    ref="inputAnswer"
    v-model="answer"
    :solution="solution"
    :inputDisabled="inputDisabled"
    :placeholder="''"
    @inputUpdated="checkAnswer" />
  <div>
    <Counter
      :correct="correct"/>
  </div>
  <Timer
    ref="timer"
    @activeEnded="stop"
    :remainingSeconds="remainingSeconds"
  />
  <div>
    <StartButton @clicked="start" />
  </div>
  <div class="pTable" v-show="mostRecentStats">
    <Table ref="stats"
      :title="'Your recent scores'"
      :showLink="true"
      :personId="personId"
      :stats="mostRecentStats"
    />
  </div>
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
      console.log(`Answer: ${this.answer}, Solution: ${this.solution}`);
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
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
  font-size: calc(1.5vw + 1vmin);
}
input, button{
  font-size: calc(1.5vw + 1vmin);
}

@media (max-width: 700px) {
  #app{
    font-size: calc(3vw + 1vmin);
  }
  input, button, div{
    font-size: calc(3vw + 1vmin);
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
</style>
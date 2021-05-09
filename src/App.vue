<template class="app">
  <InputText 
        ref="inputIdentifier"
        v-model="personId"
      />
  <div>
    <Problem
      ref="problem" />
  </div>
  <InputNumber 
    ref="inputAnswer"
    v-model="answer"
    :solution="solution"
    :inputDisabled="inputDisabled"
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
  <div class="pTable">
    <Table :title="'Your recent scores'" v-show="mostRecentStats" :stats="mostRecentStats" />
  </div>
  <div class="hsTable">
    <HighscoreTable :title="'Top scores today'" v-show="topStatsToday" :stats="topStatsToday" />
  </div>
</template>

<script>
import InputNumber from './components/InputNumber.vue'
import InputText from './components/InputText.vue'
import HighscoreTable from './components/HighscoreTable.vue'
import Counter from './components/Counter.vue'
import Problem from './components/Problem.vue'
import StartButton from './components/StartButton.vue'
import Table from './components/Table.vue'
import Timer from './components/Timer.vue'


export default {
  name: 'App',
  components: {
    Counter,
    HighscoreTable,
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
      this.solution = this.$refs.problem?.setNewProblem();
      this.$refs.inputAnswer.resetInput();
    },
    stop: async function() {
      this.$refs.inputAnswer?.setInputFieldDisabled();
      console.log("Game is over.");
      if (this.personId) {
        await this.saveScore();
        await this.fetchScore();
        await this.fetchTodaysHighcore();
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
    },
    fetchScore: async function() {
      console.log(`Fetching score for ${this.personId} ...`);
      const res = await fetch(
        process.env.VUE_APP_API_PATH+`getStatistics?person=${this.personId}`);
      let json = await res.json();
      this.mostRecentStats = json;
      console.log(json);
    },
    fetchTodaysHighcore: async function() {
      console.log(`Fetching highscores for today ...`);
      const res = await fetch(
        process.env.VUE_APP_API_PATH+`getHighscore`);
      let json = await res.json();
      this.topStatsToday = json;
      console.log(json);
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
  font-size: calc(0.5vw + 0.5vh + 1vmin);
}

.pTable {
  position: absolute;
  width: 25%;
  left: 25%;
}
.hsTable {
  position: absolute;
  width: 25%;
  left: 50%;
}


</style>

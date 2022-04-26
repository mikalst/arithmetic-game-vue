<template class="app">
  <div class="is-flex is-flex-direction-column" style="height: 100vh">
    <nav class="navbar is-primary is-flex is-align-items-center	is-size-5">
    <div class="navbar-brand">
        <a class="navbar-item is-size-5" href="/">
          Home
        </a>
        <a class="navbar-item is-size-5" v-bind:href="personId ? '/stats?personId=' + personId : '/stats'">
          Stats
        </a>
        <p class="navbar-item is-size-5">
          {{ this.personId?.substring(0, 20) }}
        </p>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
      </div>
      <div class="navbar-end">
      </div>
    </div>
    </nav>
  <div class="container.is-fullhd is-flex is-align-items-center is-flex-direction-column my-auto">
    <div class="block is-flex is-flex-direction-row" v-show="playing">
      <CounterComponent class="mr-4"
        :correct="correct"/>
      <Timer
        ref="timer"
        @activeEnded="stop"
        :remainingSeconds="remainingSeconds"
      />
    </div>
    <div class="block px-auto" style="width:100%" v-show="playing">
      <section class="hero is-primary">
      <div class="hero-body">
        <div class="container is-flex is-align-items-center is-justify-content-center">
        <ProblemComponent
          ref="problem" />
        <InputNumber 
          ref="inputAnswer"
          v-model="answer"
          :solution="solution"
          :inputDisabled="inputDisabled"
          :placeholder="''"
          @inputUpdated="checkAnswer" />
        </div>
      </div>
      </section>
    </div>
    <div class="block" v-show="!playing">
      <StartButton ref="startButton" @clicked="start" />
      <Table ref="stats"
        v-show="mostRecentStats"
        :title="'Your recent scores'"
        :showLink="true"
        :personId="personId"
        :stats="mostRecentStats"
      />
      </div>
    </div>
  </div>
</template>
<script>


import InputNumber from './components/InputNumber.vue'
import CounterComponent from './components/Counter.vue'
import ProblemComponent from './components/Problem.vue'
import StartButton from './components/StartButton.vue'
import Table from './components/Table.vue'
import Timer from './components/Timer.vue'


export default {
  name: 'App',
  components: {
    CounterComponent,
    InputNumber,
    ProblemComponent,
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
      personDisplayName: null,
      mostRecentStats: [],
      topStatsToday: [],
      playing: false
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
      this.playing = false;
      this.$refs.inputAnswer?.setInputFieldDisabled();
      this.$refs.startButton.setStartButtonEnabled();
      console.log("Game is over.");
      if (this.personId) {
        await this.saveScore();
        await this.$refs.stats.fetchScore(this.personId, 30);
      }
    },
    start: async function() {
      console.log("Game is starting.");
      this.playing = true;
      this.correct = 0;
      this.$refs.timer.start();
      this.$refs.inputAnswer?.setInputFieldActive();
      this.$refs.startButton.setStartButtonDisabled();
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
  mounted: async function () { 
    
    const response = await fetch('/.auth/me');
    const payload = await response.json();

    if (!payload || !payload.clientPrincipal)
    {
      console.log("No user logged in.");
      window.location.replace('/.auth/login/aad');
      return;
    }
    // const { clientPrincipal } = payload;
    console.log(payload);

    this.personId = payload.clientPrincipal.userId;
    this.personDisplayName = payload.clientPrincipal.userDetails;

    console.log(this.personId);
    // console.log(clientPrincipal);
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
}

.main, a{
  text-align: center;
  padding: 0.3rem;
}

.pTable {
  width: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
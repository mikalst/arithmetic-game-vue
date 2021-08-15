<template>
  <div class="timer">
    Remaining: {{ remainingSeconds }}
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data: function () {
    return {
      remainingSeconds: null,
      timer: null
    }
  },
  emits: ['activeEnded'],
  methods: {
    start: function() {
      clearInterval(this.timer);
      this.remainingSeconds = 60;
      this.timer = setInterval((context) => {
        context.remainingSeconds--;
        if (context.remainingSeconds === 0) {
          clearInterval(this.timer);
          this.$emit('activeEnded');
        }
      }, 1000, this);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

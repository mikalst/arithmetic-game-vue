<template>
  <div class="timer">
    <h1>Remaining: {{ remainingSeconds }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Input',
  data: function () {
    return {
      remainingSeconds: 5
    }
  },
  methods: {
    start: function() {
      this.remainingSeconds = 30;
      var timer = setInterval((context) => {
        context.remainingSeconds--;
        if (context.remainingSeconds === 0) {
          clearInterval(timer);
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

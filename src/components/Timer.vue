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
      remainingSeconds: null,
      timer: null
    }
  },
  methods: {
    start: function() {
      clearInterval(this.timer);
      this.remainingSeconds = 5;
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

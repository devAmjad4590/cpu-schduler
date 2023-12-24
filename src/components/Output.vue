<template>
  <div class="output">
    <h3>Output</h3>
    <table class="table">
      <tr>
        <th>Process</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
        <th>Finish Time</th>
        <th>Turnaround Time</th>
        <th>Waiting time</th>
      </tr>
    </table>
    <button v-on:click="printArray">Test</button>
  </div>
</template>

<script>
export default {
  props: {
    completed: {
      type: Array,
      required: true,
    },
    queue: {
      type: Array,
      required: true,
    },
  },
  methods: {
    printArray() {
      console.log(this.completed);
      console.log(this.queue)
      console.log(this.avgWaitingTime);
      console.log(this.avgTurnAroundTime);


      // resetting values after displaying them (very important to do this)
    //   this.completed.length = 0;
    //   this.queue.length = 0;
    //   this.avgTurnAroundTime = 0;
    // this.avgWaitingTime = 0;

    },
  },
  computed: {
    avgWaitingTime() {
      let totalWaitingTime = 0;
      for (let i = 0; i < this.completed.length; i++) {
        totalWaitingTime += this.completed[i].waitingTime;
      }
      let avgWaitingTime = totalWaitingTime / this.completed.length;
      return avgWaitingTime.toFixed(2);
    },
    avgTurnAroundTime() {
      let totalTurnAroundTime = 0;
      for (let i = 0; i < this.completed.length; i++) {
        totalTurnAroundTime += this.completed[i].turnAroundTime;
      }
      // format it to 2 decimal places
      let avgTurnAroundTime = totalTurnAroundTime / this.completed.length;
      return avgTurnAroundTime.toFixed(2);
    },
  },
};
</script>

<style>
.output {
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 25px;
  width: 750px;
  height: 600px;
}

h3 {
  color: #e7e5ff;
}

table,
th,
td {
  border: 1px solid black;
}
</style>
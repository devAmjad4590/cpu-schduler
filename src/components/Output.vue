<template>
  <div class="output">
    <h1>Output</h1>
    <table class="table">
      <tr>
        <th>Process</th>
        <th>Arrival Time</th>
        <th>Burst Time</th>
        <th>Finish Time</th>
        <th>Turnaround Time</th>
        <th>Waiting time</th>
      </tr>
      <tr v-for="(item, index) in completed" :key="index">
        <td>{{ item.process }}</td>
        <td>{{ item.arrivalTime }}</td>
        <td>{{ item.burstTime }}</td>
        <td>{{ item.completedTime }}</td>
        <td>{{ item.turnAroundTime }}</td>
        <td>{{ item.waitingTime }}</td>
      </tr>
    </table>
    <h3>Average Waiting Time: {{ avgWaitingTime }}</h3>
    <h3>Average Turnaround Time: {{ avgTurnAroundTime }}</h3>
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
  margin-top: 20px;
  margin-left: 10px;
  color: #e7e5ff;
}

table,
th,
td {

  border: 1px solid black;
  text-align: center;
  margin-left: 10px;
  color: #e7e5ff;
  font-size: 20px;

}

td th{
  padding: 10px;
}
</style>
<template>
  <div class="output">
    <h1>Output</h1>
    <div>
      <GanttChart :queue="queue"></GanttChart>
      <div class="time-container">
        <div class="time" v-for="(time, index) in timeStamp" :key="index">{{ time }}</div>

      </div>
    </div>
    <div>
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

    </div>
    <div>
      <h3>Average Waiting Time: {{ avgWaitingTime }}</h3>
      <h3>Average Turnaround Time: {{ avgTurnAroundTime }}</h3>

    </div>
  </div>
</template>

<script>
import GanttChart from "./GanttChart.vue";
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
    timeStamp: {
      type: Array,
      required: true,
    }
    
  },
  methods: {
  },
  components: {
    GanttChart
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
  width: 950px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 50px;
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

.time{
  color: #e7e5ff;
  width: 45px;
}

.time-container{
  margin-top: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  
}

</style>
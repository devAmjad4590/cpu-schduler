<template>
  <div :class="{ 'main-div': true, 'extend-div': this.algo == 'RR' }">
    <Header title="CPU SCHEDULING ALGORITHM"> </Header>
    <div class="algo">
      <form @submit.prevent>
        <AlgoSelection @option-change="handleChange"></AlgoSelection>
        <InputForm
          @input-change="handleArrivalInput"
          v-if="this.algo != ''"
          title="Arrival Time"
          ref="arrivalChild"
        ></InputForm>
        <InputForm
          @input-change="handleBurstInput"
          v-if="this.algo != ''"
          title="Burst Time"
          ref="burstChild"
        ></InputForm>
        <Quantum
          @quantum-change="handleQuantum"
          v-if="this.algo == 'RR'"
          ref="quantumChild"
        ></Quantum>
        <Button
          class="btn btn-extend"
          v-if="this.algo != ''"
          @click-event="handleClick"
        ></Button>
        <!-- <p v-if="result">Burst time: {{ this.burstTime }}</p>
        <p v-if="result">Arrival time: {{ this.arrivalTime }}</p>
        <p v-if="result">Quantum: {{ this.quantum }}</p> -->
      </form>
    </div>
  </div>
  <Output v-if="result" :completed="completed" :queue="queue" :timeStamp="timeStamp"></Output>
</template>

<script>
import Header from "./components/Header.vue";
import AlgoSelection from "./components/AlgoSelection.vue";
import InputForm from "./components/InputForm.vue";
import Button from "./components/Button.vue";
import Quantum from "./components/Quantum.vue";
import Output from "./components/Output.vue";

export default {
  name: "App",
  components: {
    Header,
    AlgoSelection,
    InputForm,
    Button,
    Quantum,
    Output
  },
  data() {
    return {
      algo: "",
      arrivalTime: [],
      burstTime: [],
      result: false,
      quantum: 0,
      completed: [],
      queue:[],
      timeStamp: []
    };
  },
  methods: {
    reset(){
      if(this.result == true){
        this.result = false;
        this.queue = [];
        this.completed = [];
        this.quantum = 0;
        this.arrivalTime = [];
        this.burstTime = [];
        this.timeStamp = [];

      }
    }
    ,
    handleChange(value) {
      this.reset();
      this.algo = value;
    },
    handleArrivalInput(value) {
      this.reset();

      this.arrivalTime = value;

    },
    handleBurstInput(value) {
      this.reset();

      this.burstTime = value;

    },
    handleQuantum(value) {
      this.reset();

      this.quantum = value;

    },
    handleClick() {
      this.clearForm();
      this.reset();

      if (
        this.arrivalTime.length != this.burstTime.length ||
        this.arrivalTime.length == 0 ||
        this.burstTime.length == 0
      ) {
        alert("Please enter valid input");
        // clear the input
        this.arrivalTime = [];
        this.burstTime = [];
      } else if (
        !this.arrivalTime.every(Number.isInteger) ||
        !this.burstTime.every(Number.isInteger)
      ) {
        alert("Please enter only integers");
        // clear the input
        this.arrivalTime = [];
        this.burstTime = [];
      } else {
        this[this.algo](); // same as this.FCFS() etc
        this.result = true;
      }
    },
    SJR() {
      alert("SJF");
    },
    PSJR() {},
    P() {
      alert("P");
    },
    PP() {
      alert("PP");
    },
    RR() {
         // Create process objects
  let processes = [];
  let readyQueue = [];
  let completed = [];
  let currentTime = 0;
  let remainingBurst = [...this.burstTime]

  const calculateTurnAroundTime = (process) => {
    process.turnAroundTime = process.completedTime - process.arrivalTime;
  }

  const caculateWaitingTime = (process) => {
    process.waitingTime = process.turnAroundTime - process.burstTime;
  }

  

  for (let i = 0; i < this.arrivalTime.length; i++) {
    processes.push({
      process: String.fromCharCode(65 + i),
      arrivalTime: this.arrivalTime[i],
      burstTime: this.burstTime[i],
      waitingTime: 0,
      turnAroundTime: 0,
      completedTime: 0, // Initialize completedTime to arrivalTime
      remainingTime: remainingBurst[i],
      newArrivalTime: this.arrivalTime[i],
    });
  }

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  currentTime = processes[0].arrivalTime;
  for(let i = 0; i < processes.length; i++){
    readyQueue.push(processes[i]);
    }

  // Loop until all processes are completed
  while(readyQueue.length > 0){
    readyQueue.sort((a, b) => a.newArrivalTime - b.newArrivalTime)
    let currentProcess = readyQueue.shift();
    this.queue.push(currentProcess);
    if(currentProcess.remainingTime > this.quantum){
      currentTime += this.quantum;
      currentProcess.remainingTime -= this.quantum;
      currentProcess.newArrivalTime = currentTime;
      readyQueue.push(currentProcess);
    }
    else{
      currentTime += currentProcess.remainingTime;
      currentProcess.remainingTime = 0;
      currentProcess.completedTime = currentTime;
      calculateTurnAroundTime(currentProcess);
      caculateWaitingTime(currentProcess);
      this.completed.push(currentProcess);
      this.result = true;
    }
    this.timeStamp.push(currentTime);
    

    
  }

  console.log(this.completed)
  
  }
  ,
    clearForm() {
      this.$refs.arrivalChild.clearForm();
      this.$refs.burstChild.clearForm();
      this.$refs.quantumChild.clearForm();
    },
  },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #5c5c66;
}

/* center div */
.main-div {
  border: 2px solid black;
  border-radius: 25px;
  width: 750px;
  height: 600px;
  text-align: center;
  margin-top: 100px;
}

.extend-div {
  height: 700px;
}

.algo {
  margin-top: 100px;
}

h3 {
  color: #e7e5ff;
}

.btn {
  margin-top: 50px;
}
</style>

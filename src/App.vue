<template>
  <div :class="{
    'main-div': true,
    'extend-div': this.algo == 'RR' || this.algo == 'P',
  }">
    <Header title="CPU SCHEDULING ALGORITHM"> </Header>
    <div class="algo">
      <form @submit.prevent>
        <AlgoSelection @option-change="handleChange"></AlgoSelection>
        <InputForm @input-change="handleArrivalInput" v-if="this.algo != ''" title="Arrival Time" ref="arrivalChild">
        </InputForm>
        <InputForm @input-change="handleBurstInput" v-if="this.algo != ''" title="Burst Time" ref="burstChild">
        </InputForm>
        <Quantum @quantum-change="handleQuantum" v-if="this.algo == 'RR'" ref="quantumChild"></Quantum>
        <InputForm @input-change="handlePriority" title="Priority" v-if="this.algo == 'P'" ref="priorityChild">
        </InputForm>
        <Button class="btn btn-extend" v-if="this.algo != ''" @click-event="handleClick"></Button>
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
    Output,
  },
  data() {
    return {
      algo: "",
      arrivalTime: [],
      burstTime: [],
      result: false,
      quantum: 0,
      completed: [],
      queue: [],
      timeStamp: [],
      priority: [],
    };
  },
  methods: {
    reset() {
      if (this.result == true) {
        this.result = false;
        this.queue = [];
        this.completed = [];
        this.quantum = 0;
        this.arrivalTime = [];
        this.burstTime = [];
        this.timeStamp = [];
        this.priority = [];
      }
    },
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
    handlePriority(value) {
      this.reset();

      this.priority = value;
    },
    handleClick() {
      this.clearForm();
      this.reset();

      if (
        this.arrivalTime.length != this.burstTime.length ||
        this.arrivalTime.length == 0 ||
        this.burstTime.length == 0 ||
        (this.algo == "P" && this.priority.length != this.arrivalTime.length)
      ) {
        alert("Please enter valid input");
        // clear the input
        this.arrivalTime = [];
        this.burstTime = [];
      } else if (
        !this.arrivalTime.every(Number.isInteger) ||
        !this.burstTime.every(Number.isInteger) ||
        (this.algo == "P" && !this.priority.every(Number.isInteger))
      ) {
        alert("Please enter only integers");
        // clear the input
        this.arrivalTime = [];
        this.burstTime = [];
        this.priority = [];
      } else {
        this[this.algo](); // same as this.FCFS() etc
        this.result = true;
      }
    },
    SJF() {
      // Copy from here
      // Create process objects
      let processes = [];
      let readyQueue = [];
      let arrivalQueue = [];
      let completed = [];
      let currentTime = 0;
      let remainingBurst = [...this.burstTime];

      const calculateTurnAroundTime = (process) => {
        process.turnAroundTime = process.completedTime - process.arrivalTime;
      };

      const calculateWaitingTime = (process) => {
        process.waitingTime = process.turnAroundTime - process.burstTime;
      };

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
      this.timeStamp.push(currentTime);
      for (let i = 0; i < processes.length; i++) {
        readyQueue.push(processes[i]);
        arrivalQueue.push(processes[i]);
      }
      let currentProcess =  processes[0];
      //
      // Loop until all processes are completed
      while (readyQueue.length > 0) {
        arrivalQueue.sort((a,b) => a.burstTime - b.burstTime);
        currentProcess = arrivalQueue.shift();
        
        
        if (currentTime >= currentProcess.arrivalTime) { //always true
         readyQueue.sort((a, b) => a.burstTime - b.burstTime);
         currentProcess = readyQueue.shift(); 
        this.queue.push(currentProcess);
      
        }
        else{
          arrivalQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
          readyQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
          currentProcess = readyQueue.shift(); 
        this.queue.push(currentProcess);
          console.log("Failed to");
        } 
        console.log(currentProcess);
        currentTime += currentProcess.burstTime;
          currentProcess.completedTime = currentTime;
          calculateTurnAroundTime(currentProcess);
          calculateWaitingTime(currentProcess);
          this.completed.push(currentProcess);
          this.result = true;
          this.timeStamp.push(currentTime);
       }
    },
    PSJF() {
      },
    P() { 
      let processes = [];
  let readyQueue = [];
  let completed = [];
  let currentTime = 0;

  const calculateTurnAroundTime = (process) => {
    process.turnAroundTime = process.completedTime - process.arrivalTime;
  };

  const calculateWaitingTime = (process) => {
    process.waitingTime = process.turnAroundTime - process.burstTime;
  };

  for (let i = 0; i < this.arrivalTime.length; i++) {
    processes.push({
      process: String.fromCharCode(65 + i),
      arrivalTime: this.arrivalTime[i],
      burstTime: this.burstTime[i],
      priority: this.priority[i],
      waitingTime: 0,
      turnAroundTime: 0,
      completedTime: 0,
    });
  }

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  currentTime = processes[0].arrivalTime;
  this.timeStamp.push(currentTime);

  // Loop until all processes are completed
  while (processes.length > 0) {
    // Select the process with the highest priority that has arrived
    let currentProcess = processes.reduce((prev, curr, i) => {
      if (curr.arrivalTime <= currentTime && (prev == null || curr.priority < prev.priority)) {
        return curr;
      } else {
        return prev;
      }
    }, null);

    if (currentProcess != null) {
      // Execute the current process
      this.queue.push(currentProcess);
      currentTime += currentProcess.burstTime;
      currentProcess.completedTime = currentTime;
      calculateTurnAroundTime(currentProcess);
      calculateWaitingTime(currentProcess);
      this.completed.push(currentProcess);
      this.timeStamp.push(currentTime);

      // Remove the executed process from the list
      processes = processes.filter((process) => process !== currentProcess);
    } else {
      // If no process has arrived yet, increment the current time
      currentTime++;
    }
  }

  this.result = true;
    },
    PP() {
      alert("PP");
    },
    RR() {
      // Copy from here
      // Create process objects
      let processes = [];
      let readyQueue = [];
      let completed = [];
      let currentTime = 0;
      let remainingBurst = [...this.burstTime];

      const calculateTurnAroundTime = (process) => {
        process.turnAroundTime = process.completedTime - process.arrivalTime;
      };

      const calculateWaitingTime = (process) => {
        process.waitingTime = process.turnAroundTime - process.burstTime;
      };

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
      this.timeStamp.push(currentTime);
      for (let i = 0; i < processes.length; i++) {
        readyQueue.push(processes[i]);
      }

      // Loop until all processes are completed
      while (readyQueue.length > 0) {
        readyQueue.sort((a, b) => a.newArrivalTime - b.newArrivalTime);
        let currentProcess = readyQueue.shift();
        this.queue.push(currentProcess);
        // till here
        if (currentProcess.remainingTime > this.quantum) {
          currentTime += this.quantum;
          currentProcess.remainingTime -= this.quantum;
          currentProcess.newArrivalTime = currentTime;
          readyQueue.push(currentProcess);
        } else {
          currentTime += currentProcess.remainingTime;
          currentProcess.remainingTime = 0;
          currentProcess.completedTime = currentTime;
          calculateTurnAroundTime(currentProcess);
          calculateWaitingTime(currentProcess);
          this.completed.push(currentProcess);
          this.result = true;
        }
        this.timeStamp.push(currentTime);
      }
    },
    clearForm() {
      this.$refs.arrivalChild.clearForm();
      this.$refs.burstChild.clearForm();
      if (this.algo == "RR") {
        this.$refs.quantumChild.clearForm();
      } else if (this.algo == "P") {
        this.$refs.priorityChild.clearForm();
      }
    },
  },
};
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

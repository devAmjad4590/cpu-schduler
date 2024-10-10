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

import SJF from "./algorithms/SJF.js";
import PSJF from "./algorithms/PSJF.js";
import P from "./algorithms/P.js";
import RR from "./algorithms/RR.js";

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
        this.arrivalTime = [];
        this.burstTime = [];
      } else if (
        !this.arrivalTime.every(Number.isInteger) ||
        !this.burstTime.every(Number.isInteger) ||
        (this.algo == "P" && !this.priority.every(Number.isInteger))
      ) {
        alert("Please enter only integers");
        this.arrivalTime = [];
        this.burstTime = [];
        this.priority = [];
      } else {
        this[this.algo](); // same as this.FCFS() etc
        this.result = true;
      }
    },
    SJF() {
      SJF(this.arrivalTime, this.burstTime, this.queue, this.completed, this.timeStamp);
    },
    PSJF() {
      PSJF(this.arrivalTime, this.burstTime, this.queue, this.completed, this.timeStamp);
    },
    P() {
      P(this.arrivalTime, this.burstTime, this.priority, this.queue, this.completed, this.timeStamp);
    },
    RR() {
      RR(this.arrivalTime, this.burstTime, this.quantum, this.queue, this.completed, this.timeStamp);
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
  width: 950px;
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

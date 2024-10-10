export default function SJF(arrivalTime, burstTime, queue, completed, timeStamp) {
    let processes = [];
    let readyQueue = [];
    let currentTime = 0;
    let remainingBurst = [...burstTime];
  
    const calculateTurnAroundTime = (process) => {
      process.turnAroundTime = process.completedTime - process.arrivalTime;
    };
  
    const calculateWaitingTime = (process) => {
      process.waitingTime = process.turnAroundTime - process.burstTime;
    };
  
    for (let i = 0; i < arrivalTime.length; i++) {
      processes.push({
        process: `P${i}`,
        arrivalTime: arrivalTime[i],
        burstTime: burstTime[i],
        waitingTime: 0,
        turnAroundTime: 0,
        completedTime: 0,
        remainingTime: remainingBurst[i],
        newArrivalTime: arrivalTime[i],
      });
    }
  
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    currentTime = processes[0].arrivalTime;
    timeStamp.push(currentTime);
    let currentProcess = null;
  
    while (processes.length > 0 || readyQueue.length > 0) {
      while (processes.length > 0 && processes[0].arrivalTime <= currentTime) {
        readyQueue.push(processes.shift());
      }
  
      while (readyQueue.length > 0) {
        readyQueue.sort((a, b) => a.burstTime - b.burstTime);
        currentProcess = readyQueue.shift();
        queue.push(currentProcess);
        currentTime += currentProcess.burstTime;
        currentProcess.completedTime = currentTime;
        calculateTurnAroundTime(currentProcess);
        calculateWaitingTime(currentProcess);
        completed.push(currentProcess);
        timeStamp.push(currentTime);
      }
    }
  }
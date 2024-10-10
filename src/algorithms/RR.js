export default function RR(arrivalTime, burstTime, quantum, queue, completed, timeStamp) {
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
  
    for (let i = 0; i < processes.length; i++) {
      readyQueue.push(processes[i]);
    }
  
    while (readyQueue.length > 0) {
      readyQueue.sort((a, b) => a.newArrivalTime - b.newArrivalTime);
      let currentProcess = readyQueue.shift();
      queue.push(currentProcess);
  
      if (currentProcess.remainingTime > quantum) {
        currentTime += quantum;
        currentProcess.remainingTime -= quantum;
        currentProcess.newArrivalTime = currentTime;
        readyQueue.push(currentProcess);
      } else {
        currentTime += currentProcess.remainingTime;
        currentProcess.remainingTime = 0;
        currentProcess.completedTime = currentTime;
        calculateTurnAroundTime(currentProcess);
        calculateWaitingTime(currentProcess);
        completed.push(currentProcess);
      }
      timeStamp.push(currentTime);
    }
  }
export default function PSJF(arrivalTime, burstTime, queue, completed, timeStamp) {
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
  
      if (readyQueue.length > 0 && currentProcess == null) {
        readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
        currentProcess = readyQueue.shift();
        queue.push(currentProcess);
      }
  
      if (currentProcess != null) {
        readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
  
        if (readyQueue.length > 0 && readyQueue[0].remainingTime < currentProcess.remainingTime) {
          readyQueue.push(currentProcess);
          readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
          currentProcess = readyQueue.shift();
          queue.push(currentProcess);
          timeStamp.push(currentTime);
        } else if (currentProcess.remainingTime === 0) {
          currentProcess.completedTime = currentTime;
          calculateTurnAroundTime(currentProcess);
          calculateWaitingTime(currentProcess);
          completed.push(currentProcess);
          readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);
          currentProcess = readyQueue.shift();
          queue.push(currentProcess);
          timeStamp.push(currentTime);
        }
        currentProcess.remainingTime -= 1;
        currentTime += 1;
      }
  
      if (currentProcess != null && processes.length == 0 && readyQueue.length == 0) {
        completed.push(currentProcess);
        currentTime = currentProcess.remainingTime + currentTime;
        currentProcess.completedTime = currentTime;
        calculateTurnAroundTime(currentProcess);
        calculateWaitingTime(currentProcess);
        timeStamp.push(currentTime);
      }
    }
  }
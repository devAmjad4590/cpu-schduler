export default function P(arrivalTime, burstTime, priority, queue, completed, timeStamp) {
    let processes = [];
    let currentTime = 0;
  
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
        priority: priority[i],
        waitingTime: 0,
        turnAroundTime: 0,
        completedTime: 0,
      });
    }
  
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    currentTime = processes[0].arrivalTime;
    timeStamp.push(currentTime);
  
    while (processes.length > 0) {
      let currentProcess = processes.reduce((prev, curr) => {
        if (curr.arrivalTime <= currentTime && (prev == null || curr.priority < prev.priority)) {
          return curr;
        } else {
          return prev;
        }
      }, null);
  
      if (currentProcess != null) {
        queue.push(currentProcess);
        currentTime += currentProcess.burstTime;
        currentProcess.completedTime = currentTime;
        calculateTurnAroundTime(currentProcess);
        calculateWaitingTime(currentProcess);
        completed.push(currentProcess);
        timeStamp.push(currentTime);
        processes = processes.filter((process) => process !== currentProcess);
      } else {
        currentTime++;
      }
    }
  }
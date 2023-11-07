import fetch from "node-fetch";
import { parentPort } from "worker_threads";

parentPort?.on(
  "message",
  async (workerData) => {
    function getRandomBetween300And500() {
      return Math.random() * (500 - 300) + 300;
    }

    const randomWaitingTime = getRandomBetween300And500();

    const sendApiRequest = async () => {
      const response = await fetch("http://localhost:8080/api/processed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          command: "processed",
          idx: 5,
          cid: workerData.messageId,
          mid: workerData.messageId,
        }),
      });
      const data = await response.json();
      console.log(data, " is the data");
    };

    await setTimeout(async () => await sendApiRequest(), randomWaitingTime);
  }
);

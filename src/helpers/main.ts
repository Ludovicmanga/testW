import { Worker } from "node:worker_threads";

export const useWorker = (data: { count: number; messageId: string }) => {
  const worker = new Worker("./src/worker.js");
  worker.postMessage(data);
};

export const setBetToDB = async (redisClient) => {

  /* await redisClient.set("key", "value");
  const value = await redisClient.get("key"); */
 // console.log(value, " is the value");
};

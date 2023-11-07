import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient as CreateRedisClient } from "redis"

const app = express();
const redisClient = await CreateRedisClient();
redisClient
.on("error", (err) => console.log("Redis Client Error", err))
.connect();

app.use(express.json());
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // Be more restrictive with this in production
    methods: ["GET", "POST"],
  },
});
import apiEndpointRouter from "./routes/api.endpoint";
import { setBetToDB, useWorker } from "./helpers/main";

app.use("/api", apiEndpointRouter);

io.on("connection", (socket) => {
  console.log('I sure am connected!!');
  socket.on("enqueue", async (data: {
    count: number
  }) => {
    // on stocke les élements dans une queue redis
    console.log(redisClient.isOpen, ' is the redis state');
    useWorker({
      count: data.count,
      messageId: socket.id,
    });

  });
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

httpServer.listen(8080, () => {
  console.log("listening on port 8080");
});

import express from "express";
import next from "next";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const response = server.listen(port, () => {
    console.log("\x1B[32m%s\x1b[0m", "ready", "-", `http://localhost:${port}`);
  });

  const io = require("socket.io")(response, { cors: true });

  io.on("connect", (socket: any) => {
    socket.on("clientOnline", () => {
      console.log("用户上线了");
    });
    socket.on("disconnect", () => {
      console.log("用户关闭了");
    });

    // 广播通知
    socket.on("notification", (data: string) => {
      socket.broadcast.emit("notification", {
        message: data
      });
    });
  });
});

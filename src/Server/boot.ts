/// <reference path="../../typings/index.d.ts" />

import Express from "express";
import Http from "http";
import Socket_IO from "socket.io";

let app = Express();
let httpServer = Http.createServer(app);
httpServer.listen(4000);
console.log("Listening on port 4000");

let io = Socket_IO(httpServer);

io.on("connection", function (socket: SocketIO.Socket) {
    socket.on("move", function (data) {
        socket.broadcast.emit("move", data);
    });
});

app.use(Express.static("."));

/// <reference path="../../typings/index.d.ts" />

import Express from "express";
import Http from "http";
import Socket_IO from "socket.io";
import UUID from "node-uuid";

let app = Express();
let httpServer = Http.createServer(app);
httpServer.listen(4000);
console.log("Listening on port 4000");

let io = Socket_IO(httpServer);

let x = 0;
let y = 0;


let entities = {};
let players = {};

io.on("connection", function (socket: SocketIO.Socket) {
    socket.on("move", function (data) {
        data.uuid = players[socket.id];
        let entity = entities[data.uuid];
        entity.x += data.x;
        entity.y += data.y;
        entities[data.uuid] = entity;

        data.x = entity.x;
        data.y = entity.y;

        socket.broadcast.emit("entity_move", data);
    });

    socket.on("player_joined", function () {
        let uuid = UUID.v1();
        x = Math.floor(Math.random() * (7));
        y = Math.floor(Math.random() * (7));

        console.log("New Player " + uuid + " at X:" + x + ", Y:" + y);

        let player = {
            x: x,
            y: y,
            uuid: uuid,
            type: "human"
        };

        socket.emit("new_player", player);
        socket.broadcast.emit("new_entity", player);

        for (let uuid in entities) {
            let entity = entities[uuid];
            socket.emit("new_entity", entity);
        }

        entities[uuid] = player;
        players[socket.id] = uuid;

        x++;
        y++;
    });

    socket.on("disconnect", function () {
        let uuid = players[socket.id];
        console.log("Player " + uuid + " disconnected");

        socket.broadcast.emit("remove_entity", {
            uuid: uuid
        });

        delete players[socket.id];
        delete entities[uuid];
    });
});

app.use(Express.static("."));

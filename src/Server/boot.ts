/// <reference path="../../typings/index.d.ts" />

export function boot(express: Function, io: SocketIO.Server) {
    io.on("connection", function (socket: SocketIO.Socket) {
        console.log(socket.id);
    });
}

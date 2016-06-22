/// <reference path="../../typings/index.d.ts" />

let url = window.location.hostname + ":" + window.location.port;
let socket = io(url);

export default socket;

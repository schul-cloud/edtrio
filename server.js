const fastify = require("fastify")();
const path = require("path");
const WebSocket = require("uws").Server;
const fs = require("fs");

const edtrio = fs.readFileSync(path.join(__dirname, `public/edtrio.html`));
const viewer = fs.readFileSync(path.join(__dirname, `public/viewer.html`));

const wss = new WebSocket({
    server: fastify.server
});

wss.on("connection", ws => {
    console.log("User connected");

    ws.on("message", (msg, flags) => {
        console.log(JSON.parse(msg));
    });

    ws.on("close", (code, msg) => console.log("Connection closed"));
});

fastify.use(require("serve-static")(path.join(__dirname, "/public")));

fastify.get("*", (req, res) => {
    res
        .code(200)
        .header("Content-Type", "text/html")
        .send(edtrio);
});

fastify.listen(3030, () => {
    console.log(`Server listening on port 3030`);
});

// Chat_Papum v0.0.2

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongodb = require("mongodb");
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/css/*", (req, res) => {
  res.sendFile(__dirname + req.url);
});

app.get("/js/*", (req, res) => {
  res.sendFile(__dirname + req.url);
});

app.get("/text/*", (req, res) => {
  res.sendFile(__dirname + req.url);
});

io.on("connection", (socket) => {
  console.log(`Usuario (${socket.id}) se conectou`);

  socket.on("disconnect", () => {
    console.log(`Usuario (${socket.id}) se desconectou`);
  });

  socket.on("message", (msg) => {
    io.emit("message", msg, socket.id, "Bruna");

    console.log(`mensagem de ${socket.id}: ${msg}`);
  });
});

http.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

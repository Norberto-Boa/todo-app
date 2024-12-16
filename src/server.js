import http from "node:http"
import { json } from "stream/consumers";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes

})

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
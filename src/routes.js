import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path";


export const routes = [
  // Controller to handle creation of todos
  {
    method: "POST",
    path: buildRoutePath("/todo"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        res.writeHead(400).end(JSON.stringify({
          message: "Title is required!"
        }))
      }

      if (!description) {
        res.writeHead(400).end(JSON.stringify({
          message: "Description is required!"
        }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }


    }
  },

  // Route to list all the todos on the
  {
    method: "GET",
    path: buildRoutePath("/todos"),
    handler: (req, res) => {

    }
  }
]
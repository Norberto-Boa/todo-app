import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";
import { Database } from "./database.js";

const database = new Database;

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

      database.insert("tasks", task);

      return res.writeHead(201).end("Successfully Created!");
    }
  },

  // Route to list all the todos on the
  {
    method: "GET",
    path: buildRoutePath("/todos"),
    handler: (req, res) => {

      const { search } = req.query;

      const tasks = database.select("tasks", search ? { title: search } : null);

      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  },

  // Update task by ID
  {
    method: "PUT",
    path: buildRoutePath("/todo/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      if (!title && !description && completed == null) {
        return res.writeHead(400).end(JSON.stringify({
          message: "At least one field is required!"
        }));
      }

      database.update("tasks", id, { title, description, completed });

      return res.writeHead(200).end("Task updated successfully!");
    }
  }
]
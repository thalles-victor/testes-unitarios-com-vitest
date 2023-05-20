import express from "express";
import { userServiceInstance } from "./userInstace";

const app = express();

app.use(express.json());

app.post("/user", async (request, response) => {
  const user = request.body.user;

  const userCreated = await userServiceInstance.create(user);

  return response.status(201).json(userCreated);
});

app.get("/user/all", async (request, response) => {
  const allUsers = await userServiceInstance.getAll();

  return response.status(201).json(allUsers);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createuserController = new CreateUserController();

router.post("/users", createuserController.handle)

export { router };
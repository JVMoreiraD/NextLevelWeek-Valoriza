import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplementsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplementsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags",ensureAuthenticated, ensureAdmin,createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments",ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated,listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated,listUserReceiveComplimentsController.handle);

router.get("/tags/", ensureAuthenticated,listTagsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

export { router };
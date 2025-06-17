import express from "express";
const accountsRouter = express.Router();
import {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountByUsername,
} from "./accounts.controller";
import upload from "../../middlewares/Multer";
// import { upload } from "../../middlewares/multer";

accountsRouter.get("/", accountsGet);
accountsRouter.get("/:username", getAccountByUsername);
accountsRouter.post("/", upload.single("image"), accountCreate);

accountsRouter.delete("/:accountId", accountDelete);

accountsRouter.put("/:accountId", accountUpdate);

export default accountsRouter;

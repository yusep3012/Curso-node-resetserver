import { Router } from "express";
import {
  usersDelete,
  usersGet,
  usersPatch,
  usersPost,
  usersPut,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

router.post("/:id", usersPost);

router.patch("/:id", usersPatch);

router.delete("/:id", usersDelete);

export default router;

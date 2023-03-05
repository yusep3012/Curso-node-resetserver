import { Router } from "express";
import { check } from "express-validator";
import { googleSingIn, login } from "../controllers/auth.controller.js";
import validateFields from "../middlewares/validate-fields.js";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validateFields,
  ],
  googleSingIn
);

export default router;

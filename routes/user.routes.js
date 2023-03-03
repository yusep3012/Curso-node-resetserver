import { Router } from "express";
import { check } from "express-validator";

import {
  usersDelete,
  usersGet,
  usersPost,
  usersPut,
} from "../controllers/user.controller.js";
import {
  emailExist,
  isRoleValid,
  userExistById,
} from "../helpers/db-validators.js";

// import { isAdminRole, hasRole } from "../middlewares/validate-roles.js";
// import validateFields from "../middlewares/validate-fields.js";
// import validateJwt from "../middlewares/validate-jwt.js";

import {
  validateFields,
  validateJwt,
  hasRole,
  isAdminRole,
} from "../middlewares/index.js";

const router = Router();

// Obtener
router.get("/", usersGet);

// Actualizar todos los campos
router.put(
  "/:id",
  [
    // Valida si el id es de mongoDB
    check("id", "No es un ID válido").isMongoId(),

    // Valida si el id existe en mongoDB
    check("id").custom(userExistById),

    // Valida el rol
    check("role").custom(isRoleValid),

    validateFields,
  ],
  usersPut
);

// Crear
router.post(
  "/",
  [
    // Validar que el nombre no esté vacío
    check("name", "El nombre es obligatorio").not().isEmpty(),

    // Validar la contraseña
    check(
      "password",
      "La contraseña es obligatoria y más de 6 letras"
    ).isLength({ min: 6 }),

    // Validar si tiene formato de correo electrónico
    check("email", "El correo no tiene formato válido").isEmail(),

    // Validar si el correo existe
    check("email").custom(emailExist),

    // Validar que el rol se encuentre en los roles disponibles de la base de datos
    check("role").custom(isRoleValid),
    // check("role").custom((rol) => isRoleValid(rol)),

    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),

    validateFields,
  ],

  usersPost
);

// Borrar
router.delete(
  "/:id",
  [
    // Validar el JWT
    validateJwt,

    // FUERZA A QUE EL USUARIO TENGA QUE SER ADMINISTRADOR.
    // Validar si tiene el role de ADMIN_ROLE
    // isAdminRole,

    // Valida que tenga alguno de estos roles para poder realizar la acción
    hasRole("ADMIN_ROLE", "VENTAS_ROLE", "USER_ROLE"),

    // Valida si el id es de mongoDB
    check("id", "No es un ID válido").isMongoId(),

    // Valida si el id existe en mongoDB
    check("id").custom(userExistById),

    validateFields,
  ],
  usersDelete
);

export default router;

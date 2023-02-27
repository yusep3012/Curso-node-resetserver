import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
  // Trae los errores de la validación
  const errors = validationResult(req);

  // Validar si hay errores
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  //Hace que continúe con el siguiente middleware (o sea la siguiente validación del campo) de la lista hasta llegar a la función a ejecutar en la petición (get, post, put, delete)
  next();
};

export default validateFields;

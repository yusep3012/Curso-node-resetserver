import jwt from "jsonwebtoken";
import User from "../models/user.js";

const validateJwt = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }

  try {
    // Se desestructura el payload del token, extrayendo el uid del usuario
    const { uid } = jwt.verify(token, process.env.SECRETOR_PRIVATE_KEY);

    // Leer el usuario que corresponde al uid
    const user = await User.findById(uid);

    //
    if (!user) {
      return res
        .status(401)
        .json({ msg: "Token no válido - usuario no existe en db" });
    }

    // Validar si el uid tiene estado en true
    if (user.state === false) {
      return res
        .status(401)
        .json({ msg: "Token no válido - usuario con estado false" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

export default validateJwt;

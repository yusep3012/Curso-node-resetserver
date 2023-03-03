import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import generateJWT from "../helpers/generate-jwt.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuario o Contraseña no son correctos - correo" });
    }

    // Verificar si el usuario está activo
    if (!user.state) {
      return res.status(400).json({
        error: "Usuario o Contraseña no son correctos - estado: false",
      });
    }

    // Verificar si la contraseña es correcta
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        error: "Usuario o Contraseña no son correctos - passowrd",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal, hable con el administrador",
    });
  }
};

export { login };

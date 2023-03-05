import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import generateJWT from "../helpers/generate-jwt.js";
import googleVerify from "../helpers/google-verify.js";

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

const googleSingIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    // googleUser
    const { name, img, email } = await googleVerify(id_token);

    // Referencia para verificar si el usuario existe en la base de datos
    let user = await User.findOne({ email });

    // Si el usuario no existe
    if (!user) {
      // Tengo que crear el usuario
      const data = {
        name,
        email,
        password: ":p",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    // Si el estado del usuario está false
    if (!user.state) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    res.status(400).json({
      msg: "El token no se pudo verificar",
      ok: false,
    });
  }
};

export { login, googleSingIn };

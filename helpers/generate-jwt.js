import jwt from "jsonwebtoken";

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    // En el payload se puede guardar la información que se necesite del usuario {name, email, etc}
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETOR_PRIVATE_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el TOKEN");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;

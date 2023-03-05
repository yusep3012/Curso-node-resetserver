import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },

  img: {
    type: String,
  },

  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
    default: "USER_ROLE",
    // enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  state: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

// Para retirar el password y la versión en la respuesta visualizada en el json
userSchema.methods.toJSON = function () {
  // Se saca de la respuesta la versión y el password. Solo se retorna el resto de los campos del usuario por medio del {...user} que sería el resto de los campos a mostrar en la respuesta del JSON
  const { __v, password, _id, ...user } = this.toObject();
  // Transformar el "_id" en la respuesta del JSON a "uid"
  user.uid = _id;
  return user;
};

export default model("User", userSchema);

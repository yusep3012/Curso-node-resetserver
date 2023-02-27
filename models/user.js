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

// Para retirar el password y la versión en la respuesta
userSchema.methods.toJSON = function () {
  // Se saca de la respuesta la versión y el password, solo se retorna el resto de los campos del usuario por medio del {...user} que sería el resto de los campos a mostrar en la respuesta del JSON
  const { __v, password, ...user } = this.toObject();
  return user;
};

export default model("User", userSchema);

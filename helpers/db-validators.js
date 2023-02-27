import Role from "../models/role.js";
import User from "../models/user.js";

const isRoleValid = async (role = "") => {
  // Para evitar "role{campo de la BD} : rol{argumento de la función}" se puede declara una variable de igual nombre a la que se utiliza en la base de datos
  // const existRole = await Role.findOne({ role: rol });
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error(`El rol: ${role} no está registrado en la BD`);
  }
};

const emailExist = async (email = "") => {
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new Error(`El correo: ${email} ya está registrado`);
  }
};

const userExistById = async (id) => {
  // Verificar si el id existe en mongoDB
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new Error(`No existe el ID: ${id}`);
  }
};

export { isRoleValid, emailExist, userExistById };

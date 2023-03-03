import bcryptjs from "bcryptjs";

import User from "../models/user.js";

// Obtener
const usersGet = async (req, res) => {
  // La información opcional llega en el req.query
  const { quantity = 5, from = 0 } = req.query;
  const query = { state: true };

  // Consulta TODOS los usuarios de un solo golpe en la base de datos (puede tornarse lento y pesado por la cantidad traida)
  // const users = await User.find();

  const [total, users] = await Promise.all([
    // Se mostrará y contará solamente los usuarios cuyo estado sea true
    User.countDocuments(query),

    //Busqueda de los usuarios con un inicio y cantidad adicional de resultados
    // Los valores hay que convertirlos a número, porque el parámetro llega como string.
    User.find(query).skip(Number(from)).limit(Number(quantity)),
  ]);

  res.json({ total, users });
};

// Crear
const usersPost = async (req, res) => {
  // La información llega en el req.body
  const { name, email, password, role } = req.body;

  // Instancia del usuario (creación del usuario)
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guadar la información en la base de datos
  await user.save();

  await res.json({
    user,
  });
};

// Actualizar
const usersPut = async (req, res) => {
  // El id viene en el req.params.{nombre variable}, luego del slash- Ejm "/:id"
  const id = req.params.id;

  // Excluyo lo que no necesito que se acutlice: el id, password, google y el email. Sólo se actualizará el resto de la información (...rest)
  const { _id, password, google, email, ...rest } = req.body;

  // Validar contra BD
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // Actualizar el usuario
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    user,
  });
};

// Borrar
const usersDelete = async (req, res) => {
  // Extraigo el id del usuario
  const { id } = req.params;

  // Borrar físicamente -> No se recomienda hacerlo porque se pierde la integridad referencial, si borró o realizó algún cambio
  // const user = await User.findByIdAndDelete(id);

  // Se le está actualizando el estado del usuario a false
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  // Información del usuario autenticado
  // const userAuthenticated = req.user;

  // res.json({user, userAuthenticated});
  res.json(user);
};

export { usersGet, usersPost, usersPut, usersDelete };

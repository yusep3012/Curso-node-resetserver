const usersGet = (req, res) => {
  // La información opcional llega en el req.query
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usersPost = (req, res) => {
  // La información llega en el req.body
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - Controlador",
    nombre,
    edad,
  });
};

const usersPut = (req, res) => {
  // El id viene en el req.params.{nombre variable}, luego del slash- Ejm "/:id"
  const id = req.params.id;

  res.status(500).json({
    msg: "put API - Controlador",
    id,
  });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - Controlador",
  });
};
const usersDelete = (req, res) => {
  res.json({
    msg: "delete API - Controlador",
  });
};

export { usersGet, usersPost, usersPut, usersPatch, usersDelete };

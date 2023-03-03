const isAdminRole = (req, res, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${name} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    // Validar primero el JWT
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles.join(", ")}`,
      });
    }
    next();
  };
};

export { isAdminRole, hasRole };

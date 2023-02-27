import { Schema, model } from "mongoose";

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

export default model("Role", roleSchema);

import mongoose from "mongoose";

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar la base de datos");
  }
};

export default dbConection;

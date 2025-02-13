require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET); // 🔍 Verificar que tenga valor

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bascula1Routes = require("./routes/bascula1Routes");
const camionRoutes = require("./routes/camionRoutes");

const verifyToken = require("./auth/auth");
const { iniciarBascula } = require("./bascula");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use("/users", verifyToken, userRoutes);
app.use("/bascula1", verifyToken, bascula1Routes);
app.use("/camion", verifyToken, camionRoutes);

iniciarBascula();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

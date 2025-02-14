require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bascula1Routes = require("./routes/bascula1Routes");
const camionRoutes = require("./routes/camionRoutes");
const printerRoutes = require("./routes/printerRoutes"); 

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
app.use("/print", printerRoutes);

iniciarBascula();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

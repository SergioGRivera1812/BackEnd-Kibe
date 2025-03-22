require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bascula1Routes = require("./routes/bascula1Routes");
const bascula2Routes = require("./routes/bascula2Routes");
const camionRoutes = require("./routes/camionRoutes");
const printerRoutes = require("./routes/printerRoutes"); 
const productoRoutes = require("./routes/productoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const printer2Routes = require("./routes/printer2Routes");
const {verifyToken} = require("./auth/auth");
const { iniciarBascula1 } = require("./bascula");
const { iniciarBascula2 } = require("./bascula");

const { iniciarPLC } = require("./plc");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRoutes);

app.use("/users", verifyToken, userRoutes);
app.use("/bascula2", verifyToken, bascula2Routes);
app.use("/bascula1", verifyToken, bascula1Routes);
app.use("/camion", verifyToken, camionRoutes);
app.use("/print", printerRoutes);
app.use("/print2", printer2Routes);
app.use("/producto", verifyToken, productoRoutes);
app.use("/cliente", verifyToken, clienteRoutes);


iniciarBascula1();
iniciarBascula2();
// iniciarPLC();

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Servidor corriendo en :${PORT}`);
});

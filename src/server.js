const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bascula1Routes = require('./routes/bascula1Routes');
const cors = require('cors');
const { iniciarBascula } = require('./bascula'); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/bascula1', bascula1Routes);

iniciarBascula();
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

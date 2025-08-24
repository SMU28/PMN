const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const PORT = 3000;
app.use(express.json());
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
 console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 
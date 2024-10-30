const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use('/manual', routes);

app.listen(3000, async () => {
    try {
        // await sequelize.authenticate();
        console.log("Connected to db");
        console.log("Server running on port 3000");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});

module.exports = app;
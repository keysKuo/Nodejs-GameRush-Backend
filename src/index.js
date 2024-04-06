require('dotenv').config();
const PORT = process.env.SERVER_PORT || 5000;
const app = require('./config/server').init();
const db = require('./config/db/database');
// const routes = require('./resources/routes');

db.connect();

// app.use('/api', routes);



app.get('/', async (req, res, next) => {
    return res.json('GameRush API');
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

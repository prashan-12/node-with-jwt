const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
mongoose.connection
.on('open', () => console.log("DB Connetion Successfull!"))
.on('err', (err) => console.log(`There are DB connection Error ${err}!`));

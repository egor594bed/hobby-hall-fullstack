const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json({extended: true}))
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', require("./routes/auth.routes"));
app.use('/api/catalog', require("./routes/catalog.routes"));
app.use('/api/order', require("./routes/order.routes"));
app.use('/assets/goodsImgs', express.static(path.join(__dirname, '/assets/goodsImgs')));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.port || 5000;

async function start() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start();

                
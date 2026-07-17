const express = require('express');
const cors = require('cors');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Flight Service is healthy'
    });
});

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});

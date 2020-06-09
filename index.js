const server = require('./app');
//Listen to port
const port = 3001
server.listen(port, () => {
    console.log(`Running on ${port}`)
})
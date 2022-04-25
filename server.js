const PORT = process.env.PORT || 3000;
const server = require("./index.js");

server.listen(PORT, function(){
    console.log('listening on port: ' + PORT);
});
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const repuestosRouter = require('./routers/repuestos.router')
const repuestosRouter2 = require('./routers/repuestos2.router')




//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
    //middlewares
app.use(express.urlencoded({ extended: false }));
//archivos static
app.use(express.static(path.join(__dirname, "public")));
app.use("/cssFiles", express.static(__dirname + "/public/css"));
app.use("/imgFiles", express.static(__dirname + "/public/img"));
//router
app.use("/", repuestosRouter)
    // app.use("/", repuestosRouter2)







//server
const port = app.get('port');

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
})
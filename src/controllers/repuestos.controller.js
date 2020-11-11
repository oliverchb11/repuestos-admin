const repuestosController = {}
const { request, response } = require('express');
const db = require('../../db/firebase-conexion')
const brain = require('brain.js')

//metodos para mostrar y cargar información del carro
repuestosController.get = async(req = request, res = response) => {
    try {
        let dataArr = []
        const listado = await db.collection("Listado").where("TIPO", "==", "CARRO").get()
        listado.forEach(result => {

            if (!result.exists) {
                console.log('no existe el documento');
            }

            dataArr.push(result.data().MARCA)
        })
        let dataArr2 = []
        const listado2 = await db.collection("TIPO").where("VEHICULO", "==", "CARRO").get()
        listado2.forEach(result2 => {

            if (!result2.exists) {
                console.log('no existe el documento');
            }

            dataArr2.push(result2.data().ACCESORIO)
        })

        let dataArrM = []
        const listado3 = await db.collection("Listado").where("TIPO", "==", "MOTO").get()
        listado3.forEach(result => {

            if (!result.exists) {
                console.log('no existe el documento');
            }

            dataArrM.push(result.data().MARCA)
        })
        let dataArr2M = []
        const listado4 = await db.collection("TIPO").where("VEHICULO", "==", "MOTO").get()
        listado4.forEach(result2 => {

            if (!result2.exists) {
                console.log('no existe el documento');
            }

            dataArr2M.push(result2.data().ACCESORIO)
        })
        res.render("index", {
            data: dataArr,
            data2: dataArr2,
            datam: dataArrM,
            datam2: dataArr2M,
            msg: mensaje
        })
    } catch (error) {
        console.log('Error', error);
    }
}

repuestosController.post = async(req = request, res = response) => {

    try {
        let data = []
        const info = req.body;
        const informacion = await db.collection("CARROS").where("MARCA", "==", `${info.marca}`).where("TIPO", "==", `${info.accesorio}`).get()
        informacion.forEach(result3 => {
            data.push(result3.data().PRECIO)
            data.sort()
            prediccion(data, result3.data().NOMBRE_ESTABLECIMIENTO, result3.data().TIPO)
        })
        res.redirect("/")

    } catch (error) {
        console.log('Error', error);
    }

}

repuestosController.post2 = async(req = request, res = response) => {
    console.log(req.body.marcam, req.body.accesoriom);
    try {
        let data = []
        const info = req.body;
        const informacion = await db.collection("MOTOS").where("MARCA", "==", `${info.marcam}`).where("TIPO", "==", `${info.accesoriom}`).get()
        informacion.forEach(result3 => {
            data.push(result3.data().PRECIO)
            data.sort()
            prediccion(data, result3.data().NOMBRE_ESTABLECIMIENTO, result3.data().TIPO)
        })
        res.redirect("/")

    } catch (error) {
        console.log('Error', error);
    }

}





//metodo de predicción del carro
let mensaje = "";
const prediccion = (datos, nombre_taller, accesorio) => {
    const net = new brain.recurrent.LSTMTimeStep()
    net.train([
        datos
    ]);
    const output = net.run(datos); // 3
    console.table({ datos });
    if (datos.length === 7) {
        console.log(`El resultado mas barato de ${accesorio} es de ${datos[0]} en el taller ${nombre_taller}`);
        mensaje = `El resultado mas barato de ${accesorio} es de ${datos[0]} en el taller ${nombre_taller}`
    }
}







//exportamos el modulo para que las rutas puedan obtener la información de los metodos del controlador 
module.exports = repuestosController;
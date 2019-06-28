const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('Hubo un error al grabar el archivo.', err);
        }
    });

};

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');


    } catch (error) {

        listadoPorHacer = [];

    }

};

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion: descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getTareas = () => {

    try {

        return require('../db/data.json');


    } catch (error) {

        console.log('No hay tareas');

    }

};

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex((tarea) => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {

    cargarDB();

    let listadoModificado = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === listadoModificado.length) {
        return 'La tarea no se encontro.';

    } else {
        listadoPorHacer = listadoModificado;
        guardarDB();
        return `La tarea ${descripcion} fue borrada.`;
    }
};

module.exports = {
    crear,
    getTareas,
    actualizar,
    borrar
};
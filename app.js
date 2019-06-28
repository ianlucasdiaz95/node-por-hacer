const argv = require('./config/yargs').argv;
const colors = require('colors');

const porHacer = require('./por-hacer/por-hacer');


let comando = argv._[0];

switch (comando) {


    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getTareas();

        if (listado) {
            console.log('------ Listado de Tareas ------'.yellow);

            for (let tarea of listado) {

                console.log('Tarea: ', tarea.descripcion);
                if (tarea.completado) {
                    console.log('Estado: Completado'.green);
                } else {
                    console.log('Estado: Pendiente'.red);
                }
                console.log('----------'.yellow);

            }
        }



        break;

    case 'actualizar':
        let actualizar = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizar);
        break;

    case 'borrar':
        let borrar = porHacer.borrar(argv.descripcion);
        console.log(borrar);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}
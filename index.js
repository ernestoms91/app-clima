
require('dotenv').config()
    
    const{inquirerMenu, pausa, leerInput, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");

    console.log("Cuba");

    const main = async()=>{

        const busquedas = new Busquedas();
        let opt ;

        do{
            opt = await inquirerMenu();
            
 

            switch (opt) {
                case 1:
                    //Mostrar mensajes
                    
                    const termino = await leerInput('Ciudad: ');

                    //Buscar los lugares
                                       
                     const lugares = await busquedas.ciudad(termino);
                     
                    //Seleccionar el lugar

                    const idSeleccionado = await listarLugares(lugares);
                    if(idSeleccionado === '0') continue;
                    

                    const lugarSelec = lugares.find( l =>l.id === idSeleccionado);

                    // Guardar seleccionado
                    busquedas.agregarHistorial(lugarSelec.nombre);

                    // Clima
                    const clima = await busquedas.climaLugar(lugarSelec.lat,lugarSelec.lng);

                    // Mostrar resultados
                    console.clear();
                    console.log('\nInformación de la ciudad:\n'.green);
                    console.log('Ciudad:',lugarSelec.nombre);
                    console.log('Lat:',lugarSelec.lat);
                    console.log('Lng:',lugarSelec.lng);
                    console.log('Temperatura',clima.temp);
                    console.log('Mínima',clima.min);
                    console.log('Máxima',clima.max);
                    console.log('Como está el clima:',clima.desc);
                    
                    break;

                case 2:
                    busquedas.historialCapitalizado.forEach ((lugar, i)=>{
                        const idx = `${i +1}`.green;
                        console.log(`${idx} ${lugar}`);
                    }) 
                    break;
                    
            }

            if (opt !== 0) await pausa();

        } while (opt!== 0);
    }

    main();
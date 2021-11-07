import { from, of } from "rxjs";
import { distinct } from "rxjs/operators";

interface personajes{
    nombre:string;
}

const personajes:personajes[] = [
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'X'
    },
    {
        nombre: 'Zero'
    },
    {
        nombre: 'Dr Willy'
    },
    {
        nombre: 'Megaman'
    },
    {
        nombre: 'Zero'
    }
];

from(personajes).pipe(
    //el operador distinct elimina los elementos repetidos
    distinct(personaje => personaje.nombre)
).subscribe(console.log);
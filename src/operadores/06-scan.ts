
import { from } from 'rxjs';
import { reduce, scan, map, tap } from 'rxjs/operators';


const numeros = [1,2,3,4,5];

// const totalAcumulador = (acc, cur) => {
//     return acc + cur;
// }
const totalAcumulador = (acc, cur) => acc + cur;

// Reduce
from( numeros ).pipe(
    reduce( totalAcumulador, 0 )
)
.subscribe( console.log );

// Scan
from( numeros ).pipe(
    scan( totalAcumulador, 0 )
)
.subscribe( console.log );

// Redux
interface Usuario {
    id?: string;
    autenticado?: boolean;
    token?: string;
    edad?: number;
}

const user: Usuario[] = [
    { id: 'fher', autenticado: false, token: null },
    { id: 'fher', autenticado: true, token: 'ABC' },
    { id: 'fher', autenticado: true, token: 'ABC123' },
];
// scan((acc, cur) ) =>  acc + cur

// Aca lo que queremos es que me este manteniendo todas las modificaciones que cambian en el estado y el estado es el usuario, el usuario es una linea   { id: 'fher', autenticado: false, token: null }
const state$ = from( user ).pipe(
    scan<Usuario>( (acc, cur) => {
        console.log('Acc', acc);
        console.log('Cur', cur);
        console.log('--------------');
        console.log('Operador Spread', { ...acc, ...cur });
        return { ...acc, ...cur }
    }, { edad: 33 })
);

const id$ = state$.pipe(
    map( state => state.id )
);

id$.subscribe( console.log );

// LA secuencia es la siguiente

/**  
*@1er ejecucución
*1 - el estado inicial del scan es acc = { edad: 33 }
*2 - el acc es { id: 'fher', autenticado: false, token: null }
*3 - se retorna una nueva instacia del objeto { ...acc, ...cur }: { edad: 33, id: 'fher', autenticado: false, token: null } que a su vez es el nuevo valor de acc
*/

// recordar que el ultimo valor que prevalece del operador spread es que este más a la derecha

/** 
*@2do ejecucución
*1-  Ahora el acc es { edad: 33, id: 'fher', autenticado: false, token: null }
*2 - Ahora el cur es { id: 'fher', autenticado: true, token: 'ABC' }
*3 - se retorna una nueva instacia del objeto { ...acc, ...cur }: { edad: 33, id: 'fher', autenticado: true, token: 'ABC' } que a su vez es el nuevo valor de acc
*/

/** 
 * @3er ejecucución
 * 1 - el acc es { edad: 33, id: 'fher', autenticado: true, token: 'ABC' }
 * 2 - el cur es { id: 'fher', autenticado: true, token: 'ABC123' }
 * 3 - se retorna una nueva instacia del objeto { ...acc, ...cur }: { edad: 33, id: 'fher', autenticado: true, token: 'ABC123' } que a su vez es el nuevo valor de acc
*/






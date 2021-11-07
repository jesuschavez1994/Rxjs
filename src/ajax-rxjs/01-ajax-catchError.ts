import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, pluck } from 'rxjs/operators';

const url = 'https://api.github.com/users?per_page=5';

const getUsers = fetch(url)

// getUsers
// .then(response => response.json())
// .then(data => console.log(data))

ajax(url).pipe(
    // el operador pluck extrae el valor de la propiedad que se le pasa
    pluck('response'),
    // el operado catchError captura el error y lo pasa a la siguiente instancia de observable
    catchError(err => {
        console.log('error', err);
        // aca podemos retornar un observable, en este caso retornamos un arreglo vacio para que no rompa el flujo
        // porque supongamos que no hay internet o la url esta mal, se romperia el flujo
        // y al final el subscriber reotna este arreglo vacio
        return of([]);
    })
    //map( resp => resp.response)
)
.subscribe(data => console.log(data));
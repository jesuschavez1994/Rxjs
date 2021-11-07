import { from } from "rxjs";
import { distinctUntilKeyChanged } from "rxjs/operators";
import { DataPersonajes } from '../helper/data-personajes'

from(DataPersonajes).pipe(
    //el operador distinctUntilKeyChanged es un operador que nos permite filtrar los valores que se repiten
    distinctUntilKeyChanged('name')
).subscribe(console.log);
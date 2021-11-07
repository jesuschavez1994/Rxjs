import { from, of } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { DataPersonajes } from '../helper/data-personajes'

from(DataPersonajes).pipe(
    //el operador distinctUntilChanged solo emitira el valor si el valor anterior es diferente al actual
    distinctUntilChanged((ant, act) => ant.name === act.name)
).subscribe(console.log);
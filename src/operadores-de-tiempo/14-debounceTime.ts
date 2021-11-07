import { fromEvent } from "rxjs";
import { map, tap, pluck, debounceTime, distinctUntilChanged } from 'rxjs/operators';

const input = document.createElement("input");
document.querySelector("body").appendChild(input);

const keyups = fromEvent<KeyboardEvent>(input, "keyup");
keyups.pipe(
    // dbebounceTime(2000) para evitar que se envie el mismo evento
    debounceTime(2000),
    // capturamos el valor del input
    pluck<KeyboardEvent, string>("target", "value"),
    // filtramos los valores que no sean iguales
    distinctUntilChanged(),
)
.subscribe(console.log);
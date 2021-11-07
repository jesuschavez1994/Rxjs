import { interval, fromEvent } from "rxjs";
import { takeUntil } from "rxjs/operators";

const boton = document.createElement("button");
boton.innerHTML = "Detener Timer";

document.querySelector("body").append(boton);


const counter$ = interval(1000);
const clickBtn$ = fromEvent(boton, "click");

counter$.pipe(
    //Emite los valores emitidos por la fuente Observable hasta que un notifier Observable emite un valor
    // Al presionar el boton se detiene el timer
    takeUntil(clickBtn$)
)
.subscribe({
    next: val => console.log("next", val),
    complete: () => console.log("complete")
});

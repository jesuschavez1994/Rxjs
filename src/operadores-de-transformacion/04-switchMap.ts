import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { pluck, switchMap } from "rxjs/operators";


const body = document.querySelector('body');
const textInput = document.createElement('input');
body.append(textInput);

const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup');

const url = 'https://httpbin.org/delay/1?arg='
input$.pipe(
    pluck('target', 'value'),
    // el operador switchMap es un operador que permite cambiar de observable
    // en este ejemplo se emiten varios observables, y elultimo valor es el que se emite
    // los demas valores se ignoran 
    switchMap( texto => ajax.getJSON(`${url} + ${texto}`)),
).subscribe( console.log );
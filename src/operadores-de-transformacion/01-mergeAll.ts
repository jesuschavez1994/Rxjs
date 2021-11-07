import { fromEvent, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { debounceTime, map, mergeAll, pluck, tap } from "rxjs/operators";
import { GitHubUser, GitHubUsersResponse } from "../interface/usuarios-github.interface";


const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append(textInput, orderList);

const mostrarUsuarios = (usuarios: GitHubUser[]) => {
    console.log(usuarios);
    orderList.innerHTML = '';
    for (const usuario of usuarios) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;
        const anchor = document.createElement('a');
        anchor.href = usuario.html_url;
        anchor.text = 'Ver página';
        anchor.target = '_blank';
        li.append(img);
        li.append(usuario.login + ' ');
        li.append(anchor);
        orderList.append(li);
    }
}



const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup');

input$.pipe(
    // esperampos 500 milesimas de segundos antes de continuar
    debounceTime<KeyboardEvent>(500),
    // obtener el valor del input
    pluck<KeyboardEvent, string>('target', 'value'),
    // con el map obtenemos el valor emitido por el pluck y hacemos una peticion ajax para la busqueda de usuarios de github este map retorna un observable
    map<string, Observable<GitHubUsersResponse>>( texto => ajax.getJSON(`https://api.github.com/search/users?q=${texto}`)),
    // con el mergeAll obtenemos todos los resultados de la busqueda
    mergeAll(),
    // extraemos los items de la respuesta del mergeAll
    pluck<GitHubUsersResponse, GitHubUser[]>('items'),
).subscribe( mostrarUsuarios );
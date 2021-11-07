import { ajax } from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

const post$ = ajax.post(url, 
    {
        id: 1,
        nombre: 'Fernando'
    },
    {
    'Content-Type': 'application/json',
    'mi-token': 'ABC123'
    }
);


const put$ = ajax.put(url, 
    {
        id: 2,
        nombre: 'Jesus'
    },
    {
    'Content-Type': 'application/json',
    'mi-token': 'ABC123'
    }
)

post$.subscribe(console.log);
put$.subscribe(console.log);


// otra froma de hacer peticiones para tener mas control

ajax({
    url: url,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'mi-token': 'ABC12356'
    },
    body: {
        id: 5,
        nombre: 'Emma'
    }
}).subscribe(console.log);
import {of, interval} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';

const letras = of('a', 'b', 'c');

letras.pipe(
    mergeMap((letra) => interval(1000)
        .pipe(
            map( i => letra + i),
            take(3),
        )
    )
)
.subscribe({
    next: (value) => console.log('next', value),
    complete: () => console.log('Complete')
});


import {of, interval, fromEvent} from 'rxjs';
import {map, mergeMap, take, takeUntil} from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval();

mousedown$.pipe(
    mergeMap(() => interval$.pipe(
        takeUntil(mouseup$),
    )
)).subscribe(console.log);
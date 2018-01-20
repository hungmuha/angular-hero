import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { MessageService} from './message.service';
import { Hero } from './hero';

//The heroes web API expects a special header in HTTP save requests. 
// That header is in the httpOption constant defined in the HeroService.
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':'application/json'})
	}

@Injectable()
export class HeroService {


  constructor( 
  	private messageService: MessageService,
  	private http:HttpClient,
  ) { }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?:T){
	return (error: any) : Observable<T> => {
		// TODO: send the error to remote logging infrastructure
		console.error(error);
		// TODO: better job of transforming error for user consumption
  		this.log(`${operation} failed: ${error.message}`);
  		// Let the app keep running by returning an empty result.
    	return of(result as T);
	}
}

private log(message:string) {
	this.messageService.add('HeroService: ' + message);
}
private heroesUrl = 'api/heroes';

getHeroes(): Observable<Hero[]> {
	//Todo: send the message after fetching the heroes
	// this.messageService.add('HeroService: fetched heroes');
	return this.http.get<Hero[]>(this.heroesUrl)
		.pipe(
			tap(heroes => this.log(`fetched heroes`)),
			catchError(this.handleError('getHeroes',[]))
		);
}

/** GET hero by id. Will 404 if id not found */
getHero(id:number) : Observable<Hero> {
	const url = `${this.heroesUrl}/${id}`;
	return this.http.get<Hero>(url)
		.pipe(
			tap(_ => this.log(`fetch hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id = ${id}`))
		);
	//Todo: send the messenger _after_ fetching the hero
	// this.messageService.add(`HeroService: fetched hero id=${id}`);
	// return of(HEROES.find(hero=>hero.id ===id));
}


/** PUT: update the hero on the server */
updateHero (hero:Hero): Observable<any> {
	return this.http.put(this.heroesUrl, hero,httpOptions)
	//To catch errors, you "pipe" the observable result from http.get() 
	// through an RxJS catchError() operator.
		.pipe(
			tap(_=> this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
}

addHero (hero:Hero): Observable<Hero> {
	return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
		.pipe(
			tap((hero:Hero) => this.log(`added hero w/ id=${hero.id}`)),
			catchError(this.handleError<Hero>('addHero'))
		);
}

deleteHero (hero:Hero): Observable<Hero>{
	const id = typeof hero ==="number"? hero:hero.id;
	const url = `${this.heroesUrl}/${id}`;

	return this.http.delete<Hero>(url, httpOptions)
		.pipe(
			tap(_=>this.log(`deleted hero id = ${id}`)),
				catchError(this.handleError<Hero>('deleteHero'))
			);
}

searchHeroes(term: string): Observable<Hero[]> {
	if(!term.trim()) {
		// if not search term, return empty hero array.
		return of([]);
	}
	return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
		.pipe(
			tap(_=> this.log(`found heroes matching "$term"`)),
			catchError(this.handleError<Hero[]>('searchHeroes',[]))
		);
}


}

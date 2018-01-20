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
		.pipe(
			tap(_=> this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError<any>('updateHero'))
		);
}



}

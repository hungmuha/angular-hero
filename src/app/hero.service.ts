import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService} from './message.service';
import { Hero } from './hero';
import { HEROES} from './mock-heroes';

@Injectable()
export class HeroService {

getHeroes(): Observable<Hero[]> {
	//Todo: send the message after fetching the heroes
	this.messageService.add('HeroService: fetched heroes');
	return of(HEROES);
}
  constructor( private messageService: MessageService) { }


}

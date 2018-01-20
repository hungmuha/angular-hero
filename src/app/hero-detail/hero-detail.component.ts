import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  
  constructor(
  	private route: ActivatedRoute,
  	private heroService: HeroService,
  	private location: Location
  	//The location is an Angular service for interacting with the browser
  ) { }

  ngOnInit(): void {
  	this.getHero();
  }

  getHero(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	//route.snapshot is a static image of the route information after component is created
  	//paramMap is a dictionary of route parameter values extracted from the URL
  	//(+) JS operator convert string to number
  	this.heroService.getHero(id)
  		.subscribe(hero=>this.hero = hero);
  }

  goBack():void {
  	this.location.back();
  }

  save():void {
    this.heroService.updateHero(this.hero)
      .subscribe(()=>this.goBack());
  }

}

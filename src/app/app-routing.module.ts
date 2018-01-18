import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; 

const routes: Routes = [
	{ path: 'heroes', component: HeroesComponent}
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(routes)], //use this so it start listening for browser location
})
export class AppRoutingModule { }

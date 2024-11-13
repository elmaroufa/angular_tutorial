import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  }
  selectedHero?: Hero;
  heroes : Hero[] = [];

  constructor(private heroService : HeroService, private messageService : MessageService) {}
  
  ngOnInit(): void {
    this.getHeroes();
  }

  onSelectedHero(hero: Hero) : void {
      this.messageService.add(`add hero : ${hero.name}`)
      this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
     .subscribe(heroes => this.heroes = heroes)
  }
}

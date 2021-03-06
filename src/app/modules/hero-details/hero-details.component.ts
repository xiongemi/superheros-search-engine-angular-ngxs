import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetHeroById } from './store/hero-details.actions';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Hero } from '../../types/hero.interface';
import { getHeroDetails } from './store/hero-details.selectors';

@Component({
  selector: 'hse-heros-details',
  templateUrl: './hero-details.component.html',
  host: { class: 'flex flex-column items-center mh5-xl' }
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
  hero: Hero;

  private subscription = new Subscription();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe(paramMap => {
        this.store.dispatch(new GetHeroById(parseInt(paramMap.get('id'), 10)));
      })
    );

    this.subscription.add(this.store.select(getHeroDetails).subscribe(hero => (this.hero = hero)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

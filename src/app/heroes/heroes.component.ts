import { Component, OnInit } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  isSpecial = true;


  hero: Hero = {  // 리터럴 객체를 사용한 방법, hero의 타입은 Hero이다.
    id: 1,
    name:  'winstorm'
  };

  constructor() { }

  ngOnInit() {

  }

  onSave(event: any) {
    console.log(event);
  }
}


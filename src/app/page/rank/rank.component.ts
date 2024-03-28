import { CharacterService } from './../../services/api/character.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CharacterGetRes, Ranking } from '../../model/character_get_res';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rank',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.scss'
})
export class RankComponent implements OnInit{
  chaRank: Ranking | undefined;
  rank: any[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
      this.setup();
  }

  async setup() {
    this.chaRank = await this.characterService.ranking() as Ranking;
    console.log(this.chaRank);
    const Yest = this.chaRank.Yest;
    const Cur = this.chaRank.Cur;

    Cur.forEach(CurDay => {
      const findYest = Yest.find(Yestfind => Yestfind.cid === CurDay.cid);
      const diff = findYest ? Math.abs(findYest.ranking - CurDay.ranking) : 0;

      this.rank.push({
        cid: CurDay.cid,
        name: CurDay.name,
        img: CurDay.image,
        point: CurDay.latest_point,
        CurRank: CurDay.ranking,
        YestRank: findYest.ranking,
        diffRank: diff
      });
    });
    console.log(this.rank);

  }
}

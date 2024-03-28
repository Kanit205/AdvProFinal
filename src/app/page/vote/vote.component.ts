import { CharacterService } from './../../services/api/character.service';
import { VoteService } from './../../services/api/vote.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CharacterGetRes } from '../../model/character_get_res';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  Charac2: CharacterGetRes[] = [];
  winner: CharacterGetRes | undefined;
  loser: CharacterGetRes | undefined;
  Ea = 0;
  Eb = 0;
  Ra = 0;
  Rb = 0;
  k = 32;

  constructor(private voteService: VoteService, private characterService: CharacterService) { }

  ngOnInit() {
    this.setup();
  }

  async setup() {
    this.Charac2 = await this.voteService.get2Charac();
  }

  vote(vote: number) {
    const voteHardler = async () => {
      let win, lose;
      if (vote === 0) {
        win = this.Charac2[0].cid;
        lose = this.Charac2[1].cid;
      } else if (vote === 1) {
        win = this.Charac2[1].cid;
        lose = this.Charac2[0].cid;
      }
      // console.log("win:" + win + "lose:" + lose);

      this.winner = await this.characterService.getCharacterBycid(win!);
      this.loser = await this.characterService.getCharacterBycid(lose!);

      // console.log(this.winner);
      // console.log(this.loser);

      this.Ea = 1 / (1 + 10 ** ((this.loser.total_point - this.winner.total_point) / 400));
      this.Eb = 1 / (1 + 10 ** ((this.winner.total_point - this.loser.total_point) / 400));

      console.log('Ea: ', this.Ea);
      console.log('Eb: ', this.Eb);

      this.Ra = this.winner.total_point + this.k * (1 - this.Ea);
      this.Rb = this.loser.total_point + this.k * (0 - this.Eb);

      console.log('Ra: ', this.Ra.toFixed(0));
      console.log('Rb ', this.Rb.toFixed(0));

      Swal.fire({
        title: "Elo Rating",
        html: `<div style="display: flex; justify-content: center;">
          <div>
            <h2 style="color: #34c300;">Winner: ${this.winner.name}</h2>
            <img src="${this.winner.image}" alt="" style="object-fit: cover; width: 150px; height: 150px; border-radius: 50%;">
          </div>
          <div style="margin-left: 3vw;">
            <h2 style="color: #c30000;">Loser: ${this.loser.name}</h2>
            <img src="${this.loser.image}" alt="" style="object-fit: cover; width: 150px; height: 150px; border-radius: 50%;">
          </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center;">
          <h3>คำนวณหาค่าความคาดหวังของแต่ละรูป</h3>
            <div>
              <img src="https://miro.medium.com/v2/resize:fit:2356/1*UKxzABAH0ZSswRe83Y6kpw.png" alt=""
                style="object-fit: cover; width: 250px;">
              <img src="https://miro.medium.com/v2/resize:fit:2404/1*eBze5LbMPWzH_jxoPGoImQ.png" alt=""
                style="object-fit: cover; width: 250px;">
            </div>
          </div>
          <div style="display: flex; flex-direction: column;">
            <span>Ea = 1 / (1 + 10 ^ ((${this.winner.total_point} - ${this.loser.total_point}) / 400)) = ${this.Ea}</span>
            <span>Eb = 1 / (1 + 10 ^ ((${this.loser.total_point} - ${this.winner.total_point}) / 400)) = ${this.Eb}</span>
          </div>
          <h3>คำนวณคะแนนใหม่ของแต่ละรูป</h3>
          <div>
            <img src="https://miro.medium.com/v2/resize:fit:1400/1*0ieY3WCOi8xgQ42nuqhICQ.png" alt=""
              style="object-fit: cover; width: 250px;">
          </div>
          <div style="display: flex; flex-direction: column;">
            <span>Ra = ${this.winner.total_point} + ${this.k} * (1 - ${this.Ea}) = <span style="color: #34c300;">${this.Ra}</span></span>
            <span>Rb = ${this.loser.total_point} + ${this.k} * (0 - ${this.Eb}) = <span style="color: #c30000;">${this.Rb}</span></span>
          </div>`,
        width: '900px',
        confirmButtonColor: "#434343",
      });

      const body = {
        win: win,
        winnew: this.Ra.toFixed(0),
        lose: lose,
        losenew: this.Rb.toFixed(0),
        uid: parseInt(localStorage.getItem('uid')!)
      };
      this.voteService.pointSet(body);
      this.setup();
    }
    voteHardler();
  }
}

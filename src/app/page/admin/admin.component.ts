import { AuthenService } from './../../services/api/authen.service';
import { CharacterService } from './../../services/api/character.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterGetRes } from '../../model/character_get_res';
import { AuthenGetRes } from '../../model/authen_get_res';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  charac: CharacterGetRes[] = [];
  user: AuthenGetRes[] = [];
  more: number = 5;
  admin: AuthenGetRes | undefined;

  constructor(private router: Router, private characterService: CharacterService, private authenService: AuthenService) { }

  ngOnInit () {
    this.setup();
  }

  async setup() {
    this.admin = await this.authenService.getUserID(parseInt(localStorage.getItem('uid')!));
    if (this.admin.type !== 1) {
      this.router.navigate(['']);
    }
    this.user = await this.authenService.GetAllUser();
    console.log(this.user);
  }

  showmore() {
    this.more = this.more + 5;
    console.log(this.more);
  }



}

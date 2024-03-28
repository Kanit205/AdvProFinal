import { AuthenService } from './../../services/api/authen.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenGetRes } from '../../model/authen_get_res';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user: AuthenGetRes | undefined;

  constructor(private router: Router, private authenService: AuthenService) { }

  vote () {
    this.router.navigate(['/Vote']);
  }
}

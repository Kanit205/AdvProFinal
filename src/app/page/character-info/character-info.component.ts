import { VoteService } from './../../services/api/vote.service';
import { AuthenService } from './../../services/api/authen.service';
import { CharacterService } from './../../services/api/character.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterGetRes, graphData } from '../../model/character_get_res';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js/auto';
import Charts from 'chart.js/auto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss'
})
export class CharacterInfoComponent implements OnInit {
  character: CharacterGetRes | undefined;
  cid: any;
  graphData: graphData | undefined;
  fileSelect: File | null = null;

  potGraph: Chart.ChartData = {
    labels: [],
    datasets: [],
  }

  constructor(private characterService: CharacterService, private activatedRoute: ActivatedRoute, private authenService: AuthenService, private router: Router, private voteService: VoteService) { }

  ngOnInit() {
    this.setup();
    this.graph();
  }

  async setup() {
    this.cid = this.activatedRoute.snapshot.queryParamMap.get('cid');
    console.log(this.cid);
    this.character = await this.characterService.getCharacterBycid(this.cid);
    console.log(this.character);
  }

  async graph() {
    try {
      // เรียกใช้งาน characterService.Graph() เพื่อดึงข้อมูลกราฟ
      this.graphData = await this.characterService.Graph(this.cid) as graphData;

      // แสดงข้อมูลที่ได้รับใน console.log เพื่อตรวจสอบ
      console.log(this.graphData.graphData);

      // กำหนดข้อมูลสำหรับกราฟ
      const data = {
        labels: this.graphData.graphData.map(data => data.history_date),
        datasets: [{
          label: "Score",
          data: this.graphData.graphData.map(data => data.history_point),
          borderColor: 'rgb(206, 111, 0)',
          // backgroundColor: 'rgb(255, 255, 255)'
        }]
      };

      // กำหนดคอนฟิกเพื่อสร้างกราฟ
      const config: Chart.ChartConfiguration = {
        type: 'line',
        data: data
      };

      // เลือก element ที่มี id เป็น myChart และสร้างกราฟด้วย Chart.js
      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      if (ctx) {
        new Charts(ctx, config);
      }
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
      console.error(error);
    }
  }

  updateName(name: string) {
    if (name) {
      const body = {
        newname: name,
        cid: this.character?.cid
      }

      this.characterService.UpdateName(body);

      Swal.fire({
        title: "Update Successful.",
        icon: "success",
        confirmButtonColor: "#434343",
      }).then(() => {
        location.reload();
      });

    } else {
      Swal.fire({
        title: "Not found name to change.",
        text: "Please enter the name you want to change.",
        icon: "info",
        confirmButtonColor: "#434343",
      }).then(() => {
        location.reload();
      });
    }
  }

  DeleteImg() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to delete?',
      showCancelButton: true, // แสดงปุ่ม "Cancel"
      confirmButtonText: 'Yes', // ปุ่ม "Yes"
      cancelButtonText: 'No', // ปุ่ม "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteImage(this.character!.image);
        const body2 = {
          cid: this.cid
        }
        this.voteService.HistoryReset(body2);
        const body = {
          cid: this.cid,
          uid: parseInt(localStorage.getItem('uid')!)
        };
        // console.log(body);
        this.characterService.DeleteImgDB(body);
        this.router.navigate(['/Profile']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        location.reload();
      }
    });
  }

  deleteImage(filename: any) {
    const body = {
      url: filename
    };
    console.log(filename);

    this.authenService.deleteImgProfile(body);
  }

  EditImg(event: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure to Update?',
      showCancelButton: true, // แสดงปุ่ม "Cancel"
      confirmButtonText: 'Yes', // ปุ่ม "Yes"
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const body = {
          url: this.character?.image,
        }
        this.authenService.deleteImgProfile(body);

        this.fileSelect = event.target.files![0];
        const formData = new FormData();
        formData.append('img', this.fileSelect!);
        formData.append('cid', this.cid);
        this.characterService.UpdateImage(formData);

        const body2 = {
          cid: this.cid
        }
        this.voteService.HistoryReset(body2);
        location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        location.reload();
      }
    });
  }
}

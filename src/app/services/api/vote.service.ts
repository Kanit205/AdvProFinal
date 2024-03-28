import { HttpClient } from '@angular/common/http';
import { Constants } from './../../config/constants';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CharacterGetRes } from '../../model/character_get_res';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private constants: Constants, private http: HttpClient) { }

  public async get2Charac() {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}vote`));
    return res as CharacterGetRes[];
  }

  public async pointSet(body: any) {
    // console.log(body);
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}vote`, body));
  }

  public async HistoryReset(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}vote/deleteHistory`, body));
  }
}

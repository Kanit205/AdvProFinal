import { HttpClient } from '@angular/common/http';
import { Constants } from './../../config/constants';
import { Injectable } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { CharacterGetRes, Ranking } from '../../model/character_get_res';
import { URLGetRes } from '../../model/url_get_res';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private constants: Constants, private http: HttpClient) { }

  public async getCharacterByuid(uid: number) {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}character?uid=${uid}`));
    return res as CharacterGetRes[];
  }

  public async getCharacterBycid(cid: number) {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}character?cid=${cid}`));
    return res as CharacterGetRes;
  }

  public async GetUrl(formData: FormData) {
    const res = await lastValueFrom(this.http.post<any>(`${this.constants.API_ENDPOINT}uploads/GetUrl`, formData));
    console.log(res);
    return res;
  }

  public async UploadCharacter(raw: any) {
    await lastValueFrom(this.http.post(`${this.constants.API_ENDPOINT}uploads/uploadToDB`, raw));
  }

  public async ranking() {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}character/rank`));
    return res as Ranking;
  }

  public async Graph(cid: number) {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}character/graph?cid=${cid}`));
    console.log(res);
    return res;
  }

  public async UpdateName(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}character`, body));
  }

  public async DeleteImgDB(body: any) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}character/deleteImgDB`, body));
  }

  public async AllCharacter() {
    const res = await lastValueFrom(this.http.get(`${this.constants.API_ENDPOINT}character/GetCharacter`));
    console.log(res);
    return res as CharacterGetRes[];
  }

  public async UpdateImage(formData : FormData) {
    await lastValueFrom(this.http.put(`${this.constants.API_ENDPOINT}uploads/updateCharacterImg`, formData));
  }
}


export interface CharacterGetRes {
  cid:         number;
  uid:         number;
  image:       string;
  name:        string;
  total_point: number;
  date:        Date;
}

export interface Ranking {
  Yest: any[]; // ปรับตามโครงสร้างของข้อมูลที่จะเข้าถึงใน Yest
  Cur: any[];
}

export interface graphData {
  graphData: any[];
}

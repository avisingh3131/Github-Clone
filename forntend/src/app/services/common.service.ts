import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as configs } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

const gitUserUrl = 'https://api.github.com/users';
const gitRepoUrl = 'https://github.com';

@Injectable()
export class CommonService {

  showUserList = false;

  allUserList: any[] = [];

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${gitUserUrl}`);
  }

  getUserRepoByUsername(name) {
    return this.http.get<any>(`${gitRepoUrl}/${name}`);
  }
  createNewUser(data) {
    const body = JSON.stringify(data);
    return this.http.post<any>(`${configs.clientUrl}/createUser`, body, httpOptions);
  }
  login(data) {
    const body = JSON.stringify(data);
    return this.http.post<any>(`${configs.clientUrl}/login`, body, httpOptions);
  }
}

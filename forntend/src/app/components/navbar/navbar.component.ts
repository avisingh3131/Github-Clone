import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  users: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  search = '';
  constructor(private commonService: CommonService , private router: Router) { }

  ngOnInit() {
    this.commonService.getAllUsers().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const users = data.map(v => ({...v, isView: false , repos: []}));
        this.commonService.allUserList = users;
        this.users.next(this.commonService.allUserList);
      }
    });

  }
  logOut() {
    try {
      this.router.navigate(['/']);
    } catch (error) {
      console.log('error in logOut()',  error);
    }
  }

  Search(search) {
    try {
        if (this.commonService.allUserList.length === 0) {
            return [];
        }
        if (!search) {
            this.users.next(this.commonService.allUserList.slice());
            return;
        }
        search = search.toLowerCase();
        this.users.next(this.commonService.allUserList.filter(prop =>
            prop && prop.login && prop.login.toLowerCase().includes(search)
        ));
    } catch (error) {
        console.log('Error occured in :Search()', error);
    }
}
}

import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private commonService: CommonService , private router: Router) { }

  ngOnInit() {
    this.commonService.getAllUsers().subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        const users = data.map(v => ({...v, isView: false}));
        this.commonService.allUserList = users;
      }
    });

  }
  viewUsers() {
    try {
      this.commonService.showUserList = true;
    } catch (error) {
      console.log('error in viewUsers()',  error);
    }
  }
  viewHome() {
    try {
      this.commonService.showUserList = false;
    } catch (error) {
      console.log('error in viewHome()',  error);
    }
  }
  logOut() {
    try {
      this.router.navigate(['/']);
    } catch (error) {
      console.log('error in logOut()',  error);
    }
  }
}

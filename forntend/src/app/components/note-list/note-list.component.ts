import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExampleTab } from '../../models/ExampleTab';
import { CommonService } from '../../services/common.service';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  userRepoHtml = '';


  constructor(public commonService: CommonService) {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => { // to pass the tab content dynamicaly in angular material tab
      observer.next([
        { label: 'Users', content: this.commonService.allUserList }
      ]);

    });

  }

  ngOnInit() {
  }

  viewUser(currentUser) {
    currentUser.isView = !currentUser.isView;
    this.commonService.getUserRepoByUsername(currentUser.login).subscribe(response => {
      console.log(response);
      this.userRepoHtml = response;
    });
  }
}

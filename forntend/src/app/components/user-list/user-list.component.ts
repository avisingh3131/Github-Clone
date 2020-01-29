import { Component, OnInit, Input} from '@angular/core';
import { ExampleTab } from '../../models/ExampleTab';
import { CommonService } from '../../services/common.service';
import { Observable, Observer, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
@Input() users: any;
  asyncTabs: Observable<ExampleTab[]>;
  userRepoHtml = '';


  constructor(public commonService: CommonService) {
    this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => { // to pass the tab content dynamicaly in angular material tab
      observer.next([
        { label: 'Users', content: this.users }
      ]);

    });

  }

  ngOnInit() {
  }

  viewUser(currentUser) {
    currentUser.isView = !currentUser.isView;
    if (currentUser.isView) {
      this.commonService.getAllRepos(currentUser.repos_url).subscribe(response => {
        if (Array.isArray(response) && response.length > 0) {
          currentUser.repos = response;
        }
      });
    }
  }

}

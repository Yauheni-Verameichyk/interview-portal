import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { UserInfo } from '../../domain/UserInfo';
import { Subject } from 'rxjs/Subject';
import { UserControllerService } from '../../api/rest/service/user-controller.service';
import { Router, NavigationEnd } from '@angular/router';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject();
  public isLoaded: boolean;
  users: Array<UserInfo> = new Array<UserInfo>();
  private searchParameters = 'AND##name!ASC;userRoleDisciplines#COORDINATOR,DISCIPLINE_HEAD,INTERVIEWER,HUMAN_RESOURCE';
  constructor(private userController: UserControllerService, private router: Router) { }

  ngOnInit() {
    this.getUsersWithParams();
    this.router.events
      .takeUntil(this.destroy)
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects.includes('popup:message')) {
          this.clearUserList();
          this.getUsersWithParams();
        }
      });
  }
  addNewUser() {
    this.router.navigate([{ outlets: { popup: ['users', 'new'] } }]);
  }
  receiveUsersFromSearch(parameters: string) {
    this.clearUserList();
    this.searchParameters = parameters;
    this.getUsersWithParams();
  }
  @HostListener('window:scroll', ['$event'])
  windowScrollListener() {
    const position = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if ((position === max)) {
      this.getUsersWithParams(this.users.length);
    }
  }

  private getUsersWithParams(quantity?: number) {
    console.log(this.searchParameters);
    this.userController.getUsers(quantity, this.searchParameters).takeUntil(this.destroy).subscribe(
      userList => {
        this.users.push(...userList);
        this.isLoaded = true;
      },
      error => {
        console.log(`Error in user list component type error: ${error}`);
      });
  }
  findByRole(searchParameters: string) {
    this.users = [];
    this.searchParameters = `userRoleDisciplines#${searchParameters}`;
    this.getUsersWithParams();
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    document.body.style.overflowY = 'scroll';
  }
  private clearUserList(): void {
    this.users.length = 0;
  }
}

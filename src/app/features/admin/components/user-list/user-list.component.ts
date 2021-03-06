import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { User } from 'src/app/core/interface/interface';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  @Input() userList?: User[];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  passUsername(user: User) {
    this.adminService.userSubject$.next(user);
  }
  delete(userp: User) {
    this.userList = this.userList?.filter(
      (user) => user.userEmail !== userp.userEmail
    );
  }
}

import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable } from 'rxjs';
import { User } from 'src/app/core/interface/interface';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  user?: User;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.user$.pipe(distinctUntilChanged()).subscribe((user) => {
      this.user = user;
    });
  }
}

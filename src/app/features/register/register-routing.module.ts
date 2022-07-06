import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLeaveGuard } from 'src/app/shared/guards/can-leave.guard';
import { DeactivateGuard } from 'src/app/shared/guards/deactivate.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [CanLeaveGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}

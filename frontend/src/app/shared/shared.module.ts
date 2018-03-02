import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowAuthedDirective } from './show-authed/show-authed.directive';
import { SelectUserComponent } from './select-user/select-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectRoleComponent } from './select-role/select-role.component';
import { UserFormMangerService } from './select-role/service/user-form-manger.service';
import { FormValidatorService } from './validator/validator-form/form-validator.service';
import { ValidatorMessageComponent } from './validator/validator-messge/validator-message.directive';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ ShowAuthedDirective, SelectUserComponent, ValidatorMessageComponent, SelectRoleComponent ],
  providers: [ UserFormMangerService, FormValidatorService],
  exports: [ ShowAuthedDirective, SelectUserComponent, ValidatorMessageComponent, SelectRoleComponent ]
})
export class SharedModule { }

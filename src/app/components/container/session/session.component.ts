import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {

  @Output() out_auth: EventEmitter<any> = new EventEmitter<any>();
  @Output() out_admin: EventEmitter<any> = new EventEmitter<any>();

  hide = true;
  session = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  });
  loginToDestroy?: any;

  constructor(
    private formBuilder: FormBuilder,
    private dbService: StudentsService
  ) { }

  ngOnInit(): void {}

  when_error(ref: string, validator: any): boolean {
    return !validator ? this.session.get(ref)?.errors : this.session.get(ref)?.errors?.[validator];
  }

  login(): void {
    this.loginToDestroy = this.dbService.getAll().subscribe({
      next: students => {
        const emailFound = students.find(student => student.info.email == this.session.value.email);
        if(this.session.value.email == "admin.test@gmail.com" && this.session.value.password == "admin.test") {
          this.out_auth.emit(true);
          this.out_admin.emit(true);
        } else if(emailFound && this.session.value.password == "user.test") {
          this.out_auth.emit(true);
          this.out_admin.emit(false);
        }
        this.session.reset();
      }
    });
  }

  ngOnDestroy(): void {
    if(this.loginToDestroy) this.loginToDestroy.unsubscribe();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Alumno_i } from 'src/app/models/alumnos.model';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.css']
})
export class AbmComponent implements OnInit {

  @Input() in_admin?: boolean;

  isAdmin?: boolean;

  // Variables para manejar el formulario
  dataStudents = this.formBuilder.group({
    firstName: ["", [Validators.required]],
    lastName: ["", [Validators.required]],
    age: ["", [Validators.required, Validators.min(18)]],
    email: ["", [Validators.required, Validators.email]],
    image: ["", []],
    commission: ["", [Validators.required]],
    status: ["", [Validators.required]],
    courses: new FormArray([new FormControl()])
  });
  data$!: Observable<Alumno_i[]>;
  openForm: any = { register: false, edit: false };
  saveIdToEdit?: number;

  // Variables para manejar la tabla
  elementData: any = new MatTableDataSource([]);
  displayedColumns: string[] = ["N°", 'Estudiante', 'Correo', 'Edad', "Configuración"];

  constructor(
    private formBuilder: FormBuilder,
    private dbService: StudentsService
  ) {
    this.data$ = this.dbService.getAll();
  }
  
  ngOnInit(): void {
    this.data$
      .subscribe({ next: (students: Alumno_i[]) => this.elementData.data = students})
      .unsubscribe()
    this.isAdmin = this.in_admin; 
    if(!this.isAdmin) this.displayedColumns = ["N°", 'Estudiante', 'Correo', 'Edad']
  }

  // Funciones para identificar el estado actual del formulario
  formIsOpen(): boolean {
    return this.openForm.register || this.openForm.edit;
  }
  toggleForm(typeForm: string, id?: number): void {
    if(typeForm.toLowerCase() == "register" && !this.openForm.edit) this.openForm.register = !this.openForm.register;
    if(typeForm.toLowerCase() == "edit" && !this.openForm.register) {
      this.openForm.edit = !this.openForm.edit;
      if(this.openForm.edit) this.saveIdToEdit = id;
      else this.saveIdToEdit = undefined;
    }
    if(this.saveIdToEdit) {
      this.dbService.getById(this.saveIdToEdit, true)
        .then(student => this.dataStudents.setValue({
          firstName: student.info.firstName,
          lastName: student.info.lastName,
          age: (student.info.age).toString(),
          email: student.info.email,
          image: student.info.image,
          commission: (student.data.commission).toString(),
          status: student.data.status,
          courses: student.data.courses
        }))
        .catch(err => console.error(err));
    } else this.dataStudents.setValue({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        image: "",
        commission: "",
        status: "",
        courses: [""]
    })
  }
  editing(id: number): boolean {
    if(this.saveIdToEdit) {
      if(id == this.saveIdToEdit) return false;
      return true;
    }
    return false;
  }

  // Funciones para manejar el ABM
  createUser(): void {
    this.dbService.post(this.dataStudents.value);
    this.data$
      .subscribe({ next: (students: Alumno_i[]) => this.elementData.data = students})
      .unsubscribe()
    this.dataStudents.reset();
    this.openForm.register = false;
  }
  editUser(): void {
    if(this.saveIdToEdit) {
      this.dbService.put(this.saveIdToEdit, this.dataStudents.value);
      this.data$
        .subscribe({ next: (students: Alumno_i[]) => this.elementData.data = students})
        .unsubscribe()
    }
    this.dataStudents.reset();
    this.openForm.edit = false;
    this.saveIdToEdit = undefined;
  }
  deleteUser(id: number): void {
    this.dbService.delete(id);
    this.data$
      .subscribe({ next: (students: Alumno_i[]) => this.elementData.data = students})
      .unsubscribe()
  }

  // Función para renderizar texto dinámico
  typeData(): string {
    return this.openForm.register ? "Regitrar":  this.openForm.edit && "Editar";
  }

  // Funciones para manejar los errores en las entradas
  when_error(ref: string, validator: any): boolean {
    return !validator ? this.dataStudents.get(ref)?.errors : this.dataStudents.get(ref)?.errors?.[validator];
  }
  when_touched(ref: string): boolean {
    return this.dataStudents.get(ref)?.touched!;
  }

  // Funciones para manejar los cursos
  get this_courses(): FormArray {
    return this.dataStudents.get("courses") as FormArray;
  }
  addCourse(): void {
    this.this_courses.push(new FormControl());
  }
  removeCourse(): void {
    this.this_courses.removeAt([this.this_courses].length);
  }

}
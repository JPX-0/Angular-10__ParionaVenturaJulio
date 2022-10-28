import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Alumno_i } from '../models/alumnos.model';

const creatingStudent = (id: number, student: any): Alumno_i => ({
  id,
  info: {
    firstName: student.firstName.toString(),
    lastName: student.lastName.toString(),
    age: +student.age,
    email: student.email.toString(),
    image: student.image.toString(),
  },
  data: {
    status: student.status.toString(),
    commission: +student.commission,
    courses: student.courses || []
  }
});
const updatingStudent = (student: Alumno_i, dataToMerge: any): Alumno_i => ({
  id: dataToMerge.id || student.id,
  info: {
    firstName: dataToMerge.firstName || student.info.firstName,
    lastName: dataToMerge.lastName || student.info.lastName,
    age: dataToMerge.age || student.info.age,
    email: dataToMerge.email || student.info.email,
    image: dataToMerge.image || student.info.image,
  },
  data: {
    status: dataToMerge.status || student.data.status,
    commission: dataToMerge.commission || student.data.commission,
    courses: dataToMerge.courses || student.data.courses
  }
});

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  data$!: Observable<Alumno_i[]>;

  private data: Alumno_i[] = [];

  // funciones generales
  private generateID = (): number => { // Busca el ID maximo existente en el array y le agrega +1.
    const findId = this.data.map(e => e.id);
    let newId;
    if(findId.length == 0) newId = 1;
    else newId = Math.max.apply(null, findId) + 1;
    return newId;
  }
  private foundIndex = (id: number): number => {
    const index: number = this.data.findIndex(e => e.id == id);
    if(index < 0) throw new Error("the entered [ID] does not exist in the database");
    return index;
  }

  constructor() { 
    this.data$ = new Observable<Alumno_i[]>(suscribe => suscribe.next(this.data))
  }

  // funciones CRUD
  getAll(): Observable<Alumno_i[]> {
    return of(this.data).pipe(map(students => students));
    // return this.data$;
  }
  getById(id: number, returnIndex?: boolean): Promise<Alumno_i> {
    if(returnIndex) return new Promise((res, err) => res(this.data[this.foundIndex(id)]));
    return new Promise((res, err) => {
      const foundData: Alumno_i =  this.data.find(e => e.id == id)!;
      if(!foundData) err(new Error("the entered [ID] does not exist in the database"))
      res(foundData);
    });
  }
  post(student: any): Alumno_i {
    const newStudent = creatingStudent(this.generateID(), student);
    this.data.push(newStudent);
    return newStudent;
  }
  put(id: number, student: any): void {
    const index = this.foundIndex(id);
    this.data[index] = updatingStudent(this.data[index], student);
  }
  delete(id: number): void {
    this.data.splice(this.foundIndex(id), 1);
  }

}

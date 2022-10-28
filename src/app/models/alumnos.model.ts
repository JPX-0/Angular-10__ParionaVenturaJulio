export interface Alumno_i {
  id: number,
  info: {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    image: string
  }
  data: {
    status: string,
    commission: number,
    courses: string[]
  }
}
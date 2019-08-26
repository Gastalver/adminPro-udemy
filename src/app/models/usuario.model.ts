// TRUCO Indicar propiedades en constructor.
// TRUCO ? tras nombre hace la propiedad opcional. Pero -el orden importa- todas las siguientes también
// deben ser opcionales, así que hay que poner las opcionales al final.
// Indicar un valor por defecto hace la propiedad implícitamente opcional.
// Hacemos obligatorio sólo nombre, email y password.
export class Usuario {
 constructor(
   public nombre: string,
   public email: string,
   public password: string,
   public img?: string,
   public role?: string,
   public google?: boolean,
   // tslint:disable-next-line:variable-name
   public _id?: string
 ) {
 }
}

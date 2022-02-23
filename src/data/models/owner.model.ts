export class Owner {
    firstName: string;
    lastName: string;
    dni: string;
    dniType: string;
    ownerType: string;

    constructor(firstName: string, lastName: string, dni: string, ownerType: string, dniType: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dni = dni;
      this.ownerType = ownerType;
      this.dniType = dniType;
    }
}

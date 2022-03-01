export class Owner {
    firstName: string;
    lastName: string;
    dni: string;
    dniType: string;
    ownerType: string;
    ownership: string;

    constructor(firstName: string, lastName: string, dni: string, ownerType: string, dniType: string, ownership: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.dni = dni;
      this.ownerType = ownerType;
      this.dniType = dniType;
      this.ownership = ownership;
    }
}

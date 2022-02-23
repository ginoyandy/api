import { Owner } from './owner.model';

export class Order {
    orderedDate: string;
    number: string;
    owners: Owner[];
    adress: string;
    city: string;
    department: string;
    state: string;
    enrollmentNumber: number;
    folioNumber: number;
    volumeNumer: number;
    yearNumber: number;
    observations: string;
    orderAmmount: number;
    informedDate: string;
    totalArea: number;
    constructor(
      orderedDate: string,
      number: string,
      adress: string,
      city: string,
      department: string,
      state: string,
      enrollmentNumber: number,
      folioNumber: number,
      volumeNumer: number,
      yearNumber: number,
      observations: string,
      orderAmmount: number,
      informedDate: string,
      owners: Owner[],
      totalArea: number,
    ) {
      this.orderedDate = orderedDate;
      this.number = number;
      this.adress = adress;
      this.city = city;
      this.department = department;
      this.state = state;
      this.enrollmentNumber = enrollmentNumber;
      this.folioNumber = folioNumber;
      this.volumeNumer = volumeNumer;
      this.yearNumber = yearNumber;
      this.observations = observations;
      this.orderAmmount = orderAmmount;
      this.informedDate = informedDate;
      this.owners = owners;
      this.totalArea = totalArea;
    }
}

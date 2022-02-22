export class Request {
    requestDate: string;
    number: number;
    holderFirsName: string
    holderLastName: string;
    adress: string;
    city: string;
    department: string;
    state: string;
    enrollmentNumber: number;
    folioNumber: number;
    volumeNumer: number;
    yearNumber: number;
    observations: string;
    requestAmmount: number;
    informedDate: string;

    constructor(
      requestDate: string,
      number: number,
      holderLastName: string,
      adress: string,
      city: string,
      department: string,
      state: string,
      enrollmentNumber: number,
      folioNumber: number,
      volumeNumer: number,
      yearNumber: number,
      observations: string,
      requestAmmount: number,
      informedDate: string,
    ) {
      this.requestDate = requestDate;
      this.number = number;
      this.holderLastName = holderLastName;
      this.adress = adress;
      this.city = city;
      this.department = department;
      this.state = state;
      this.enrollmentNumber = enrollmentNumber;
      this.folioNumber = folioNumber;
      this.volumeNumer = volumeNumer;
      this.yearNumber = yearNumber;
      this.observations = observations;
      this.requestAmmount = requestAmmount;
      this.informedDate = informedDate;
    }
}

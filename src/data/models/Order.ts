import { Owner } from './Owner';

export class Order {
    orderedDate: Date;
    orderNumber: string;
    owners: Owner[];
    adress: string;
    streetNumber: string;
    adressFloor: string;
    apartmentNumber: string;
    city: string;
    department: string;
    state: string;
    enrollmentNumber: string;
    folioNumber: string;
    volumeNumber: string;
    yearNumber: number;
    observations: string;
    orderAmmount: number;
    informedDate: Date;
    totalArea: string;
    office: string;
    remittance: string;
    providerFactory: string;
    searchBy: string;
    orderType: string;
    domain: string;
    registryEnterNumber: string;
    district: string;
    bankName: string;
    firstName: string;
    lastName: string;
    dni: string;
    dniType: string;
    ownerType: string;
    ownersObservations: string;
    constructor(
      registryEnterNumber: string,
      domain: string,
      apartmentNumber: string,
      streetNumber: string,
      orderType: string,
      searchBy: string,
      providerFactory: string,
      orderedDate: Date,
      orderNumber: string,
      adress: string,
      city: string,
      department: string,
      state: string,
      enrollmentNumber: string,
      folioNumber: string,
      volumeNumber: string,
      yearNumber: number,
      observations: string,
      orderAmmount: number,
      informedDate: Date,
      owners: Owner[],
      totalArea: string,
      office: string,
      remittance: string,
      district: string,
      bankName: string,
      firstName: string,
      lastName: string,
      dni: string,
      dniType: string,
      ownerType: string,
      ownersObservations: string,
    ) {
      this.district = district;
      this.registryEnterNumber = registryEnterNumber;
      this.domain = domain;
      this.apartmentNumber = apartmentNumber;
      this.streetNumber = streetNumber;
      this.orderType = orderType;
      this.searchBy = searchBy;
      this.providerFactory = providerFactory;
      this.remittance = remittance;
      this.orderedDate = orderedDate;
      this.orderNumber = orderNumber;
      this.adress = adress;
      this.city = city;
      this.department = department;
      this.state = state;
      this.enrollmentNumber = enrollmentNumber;
      this.folioNumber = folioNumber;
      this.volumeNumber = volumeNumber;
      this.yearNumber = yearNumber;
      this.observations = observations;
      this.orderAmmount = orderAmmount;
      this.informedDate = informedDate;
      this.owners = owners;
      this.totalArea = totalArea;
      this.office = office;
      this.bankName = bankName;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dni = dni;
      this.dniType = dniType;
      this.ownerType = ownerType;
      this.ownersObservations = ownersObservations;
    }
}

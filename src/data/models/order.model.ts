import { Owner } from './owner.model';

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
    enrollmentNumber: number;
    folioNumber: number;
    volumeNumer: number;
    yearNumber: number;
    observations: string;
    orderAmmount: number;
    informedDate: Date;
    totalArea: number;
    office: string;
    remittance: string;
    providerFactory: string;
    searchBy: string;
    orderType: string;
    domain: string;
    registryEnterNumber: string;
    district: string;
    bankName: string;
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
      enrollmentNumber: number,
      folioNumber: number,
      volumeNumer: number,
      yearNumber: number,
      observations: string,
      orderAmmount: number,
      informedDate: Date,
      owners: Owner[],
      totalArea: number,
      office: string,
      remittance: string,
      district: string,
      bankName: string,
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
      this.volumeNumer = volumeNumer;
      this.yearNumber = yearNumber;
      this.observations = observations;
      this.orderAmmount = orderAmmount;
      this.informedDate = informedDate;
      this.owners = owners;
      this.totalArea = totalArea;
      this.office = office;
      this.bankName = bankName;
    }
}

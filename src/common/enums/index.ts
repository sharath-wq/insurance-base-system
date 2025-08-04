export enum ListContactType {
  Person = 'Person',
  Entity = 'Entity',
}

export enum ListCountry {
  USA = 'USA',
  SaudiArabia = 'SaudiArabia',
}

export enum ListState {
  NewJersey = 'NewJersey',
  NewYork = 'NewYork',
}

export enum ListCoverable {
  PAVehicle = 'PAVehicle',
  CAVehicle = 'CAVehicle',
  Contact = 'Contact',
}

export enum ListTravelReason {
  Business = 'Business',
  Leisure = 'Leisure',
}

export enum ListClaimStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ListTransactionType {
  Quote = 'Quote',
  PolicyChange = 'PolicyChange',
  Cancellation = 'Cancellation',
  Renewal = 'Renewal',
}

export enum ListPaymentScheduleType {
  Full = 'Full',
  Monthly = 'Monthly',
}

export enum ListPaymentMode {
  CreditCard = 'CreditCard',
  DebitCard = 'DebitCard',
  NetBanking = 'NetBanking',
  Cash = 'Cash',
  Cheque = 'Cheque',
}

export enum ListContactRole {
  AccountHolder = 'AccountHolder',
  NamedInsured = 'NamedInsured',
}

export enum ListOfficialIDType {
  Iqama = 'Iqama',
  NationalID = 'NationalID',
  SSN = 'SSN',
  FEIN = 'FEIN',
}

export * from './list-product.enum';
export * from './list-policy-status.enum';
export * from './payment-method.enum';

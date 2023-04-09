export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: any;
  image: string;
  companyId: string;
  companyMembershipId: string;
  company: Company;
  companyMembership: CompanyMembership;
}

export interface CompanyMembership {
  id: string;
  userId: string;
  companyId: string;
  type: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyId: string;
}
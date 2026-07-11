import { faker } from "@faker-js/faker";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string;
  address: string;
  city: string;
  zipCode: string;
}

export function generateUser(): UserData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: "QA!Tiger$Coffee92Rocket",
    birthDate: "02/02/1998",
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zipCode: faker.string.numeric(5),
  };
}

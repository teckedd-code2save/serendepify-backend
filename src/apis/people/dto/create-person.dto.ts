import {UserType } from '@prisma/client/index';

// Using the UserType enum

// Example usage in DTO
export class CreatePersonDto {
  name: string;
  age: number;
  email: string;
  phoneNumber: string;
  type: UserType;
  password: string;
}

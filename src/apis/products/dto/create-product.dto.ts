import {Domain } from '@prisma/client/index';

export class CreateProductDto {
    title: string;
    description: string;
    url: string;
    domain: Domain[];
    
}

import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CareersService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createCareerDto: CreateCareerDto) {
    return this.prisma.career.create({
    data: createCareerDto})
  }

  findAll() {
    return this.prisma.career.findMany();
  }

  findOne(id: string) {
    return this.prisma.career.findUnique({
      where: {id: id}})
  }

  update(id: string, updateCareerDto: UpdateCareerDto) {
    return this.prisma.career.update({
      where: {id: id},
      data: updateCareerDto});
  }

  remove(id: string) {
    return this.prisma.career.delete({
      where: {id: id}});
  }
}

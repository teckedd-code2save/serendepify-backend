import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PeopleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPersonDto: CreatePersonDto) {
    return this.prisma.user.create({
      data: createPersonDto});
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },});
  }

  update(id: string, updatePersonDto: UpdatePersonDto) {
    return this.prisma.user.update({
      where: { id },
      data: updatePersonDto,});
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },});
  }
}

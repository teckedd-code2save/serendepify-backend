import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
    data: createProductDto})
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: {id: id}})
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {id: id},
      data: updateProductDto});
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: {id: id}});
  }
}

import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}


  create(createChatDto: CreateChatDto) {
    return this.prisma.chat.create(
      {
        data:createChatDto

      }
    );
  }

  findAll() {
    return this.prisma.chat.findMany();
  }

  findOne(id: string) {
    return this.prisma.chat.findUnique(
      {
        where:{id},
      }
    );
  }

  update(id: string, updateChatDto: UpdateChatDto) {
    return this.prisma.chat.update(
      {
        where:{id},
        data: updateChatDto

      }
    );
  }

  remove(id: string) {
    return this.prisma.chat.delete(
      {
        where:{id}
      }
    );
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CapabilitiesController } from './capabilities.controller';
import { CapabilitiesService } from './capabilities.service';

@Module({
  imports: [PrismaModule],
  controllers: [CapabilitiesController],
  providers: [CapabilitiesService],
})
export class CapabilitiesModule {}

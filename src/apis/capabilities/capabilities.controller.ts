import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CapabilitiesService } from './capabilities.service';

@Controller('capabilities')
export class CapabilitiesController {
  constructor(private readonly capabilities: CapabilitiesService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.capabilities.create(body);
  }

  @Get()
  list() {
    return this.capabilities.list();
  }

  @Get(':slug/:version')
  get(@Param('slug') slug: string, @Param('version') version: string) {
    return this.capabilities.get(slug, version);
  }

  @Get(':slug/:version/export/mcp')
  exportForMcp(@Param('slug') slug: string, @Param('version') version: string) {
    return this.capabilities.exportForMcp(slug, version);
  }
}

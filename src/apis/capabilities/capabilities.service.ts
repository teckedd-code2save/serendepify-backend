import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateCapabilityManifest } from './capability.types';

@Injectable()
export class CapabilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: unknown) {
    const manifest = validateCapabilityManifest(input);
    try {
      return await this.prisma.capabilityPackage.create({
        data: {
          slug: manifest.slug,
          version: manifest.version,
          name: manifest.name,
          description: manifest.description,
          manifest,
        },
      });
    } catch (error) {
      if (typeof error === 'object' && error && 'code' in error && error.code === 'P2002') {
        throw new ConflictException(`${manifest.slug}@${manifest.version} already exists`);
      }
      throw error;
    }
  }

  list() {
    return this.prisma.capabilityPackage.findMany({
      orderBy: [{ slug: 'asc' }, { createdAt: 'desc' }],
      select: {
        slug: true,
        version: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });
  }

  async get(slug: string, version: string) {
    const pkg = await this.prisma.capabilityPackage.findUnique({
      where: { slug_version: { slug, version } },
    });
    if (!pkg) throw new NotFoundException(`${slug}@${version} not found`);
    return pkg;
  }

  async exportForMcp(slug: string, version: string) {
    const pkg = await this.get(slug, version);
    const manifest = validateCapabilityManifest(pkg.manifest);

    return {
      uri: `serendepify://capabilities/${manifest.slug}/${manifest.version}`,
      name: manifest.name,
      description: manifest.description ?? null,
      tools: manifest.tools.map(tool => ({
        name: tool.name,
        description: tool.description,
        policy: tool.policy,
      })),
      resources: manifest.skills.map(skill => ({
        uri: `serendepify://capabilities/${manifest.slug}/${manifest.version}/skills/${skill.name}`,
        name: skill.name,
        mimeType: 'text/markdown',
        text: skill.instructions,
      })),
      evidence: manifest.evidence,
    };
  }
}

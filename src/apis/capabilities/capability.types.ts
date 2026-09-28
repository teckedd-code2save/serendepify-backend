export type CapabilityPolicyDecision = 'allow' | 'approve' | 'deny';

export interface CapabilityToolDefinition {
  name: string;
  description: string;
  policy: CapabilityPolicyDecision;
}

export interface CapabilitySkillDefinition {
  name: string;
  instructions: string;
}

export interface CapabilityEvidenceRequirement {
  name: string;
  description: string;
  required: boolean;
}

export interface CapabilityManifest {
  slug: string;
  version: string;
  name: string;
  description?: string;
  tools: CapabilityToolDefinition[];
  skills: CapabilitySkillDefinition[];
  evidence: CapabilityEvidenceRequirement[];
}

export function validateCapabilityManifest(value: unknown): CapabilityManifest {
  if (!value || typeof value !== 'object') {
    throw new Error('capability manifest must be an object');
  }
  const input = value as Record<string, unknown>;
  for (const key of ['slug', 'version', 'name']) {
    if (typeof input[key] !== 'string' || !(input[key] as string).trim()) {
      throw new Error(`${key} must be a non-empty string`);
    }
  }
  if (!Array.isArray(input.tools) || !Array.isArray(input.skills) || !Array.isArray(input.evidence)) {
    throw new Error('tools, skills and evidence must be arrays');
  }

  const tools = input.tools.map((raw, index) => {
    if (!raw || typeof raw !== 'object') throw new Error(`tools[${index}] must be an object`);
    const item = raw as Record<string, unknown>;
    if (typeof item.name !== 'string' || typeof item.description !== 'string') {
      throw new Error(`tools[${index}] requires name and description`);
    }
    if (!['allow', 'approve', 'deny'].includes(String(item.policy))) {
      throw new Error(`tools[${index}].policy must be allow, approve or deny`);
    }
    return {
      name: item.name,
      description: item.description,
      policy: item.policy as CapabilityPolicyDecision,
    };
  });

  const skills = input.skills.map((raw, index) => {
    if (!raw || typeof raw !== 'object') throw new Error(`skills[${index}] must be an object`);
    const item = raw as Record<string, unknown>;
    if (typeof item.name !== 'string' || typeof item.instructions !== 'string') {
      throw new Error(`skills[${index}] requires name and instructions`);
    }
    return { name: item.name, instructions: item.instructions };
  });

  const evidence = input.evidence.map((raw, index) => {
    if (!raw || typeof raw !== 'object') throw new Error(`evidence[${index}] must be an object`);
    const item = raw as Record<string, unknown>;
    if (
      typeof item.name !== 'string' ||
      typeof item.description !== 'string' ||
      typeof item.required !== 'boolean'
    ) {
      throw new Error(`evidence[${index}] requires name, description and required`);
    }
    return {
      name: item.name,
      description: item.description,
      required: item.required,
    };
  });

  return {
    slug: (input.slug as string).trim(),
    version: (input.version as string).trim(),
    name: (input.name as string).trim(),
    ...(typeof input.description === 'string' ? { description: input.description } : {}),
    tools,
    skills,
    evidence,
  };
}

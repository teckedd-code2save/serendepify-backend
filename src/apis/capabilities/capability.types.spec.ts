import { validateCapabilityManifest } from './capability.types';

describe('validateCapabilityManifest', () => {
  it('accepts a portable capability package', () => {
    const manifest = validateCapabilityManifest({
      slug: 'cloudflare-r2',
      version: '1.0.0',
      name: 'Cloudflare R2',
      tools: [
        { name: 'create_bucket', description: 'Create a bucket', policy: 'approve' },
      ],
      skills: [
        { name: 'setup', instructions: 'Inspect existing bindings before creating resources.' },
      ],
      evidence: [
        { name: 'bucket_exists', description: 'Bucket can be inspected after creation', required: true },
      ],
    });

    expect(manifest.slug).toBe('cloudflare-r2');
    expect(manifest.tools[0]?.policy).toBe('approve');
  });

  it('rejects invalid policy values', () => {
    expect(() => validateCapabilityManifest({
      slug: 'bad',
      version: '1',
      name: 'Bad',
      tools: [{ name: 'x', description: 'x', policy: 'always' }],
      skills: [],
      evidence: [],
    })).toThrow(/policy/);
  });
});

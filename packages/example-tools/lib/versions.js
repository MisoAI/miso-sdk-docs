import { exec } from './utils.js';

// TODO: doggoganger as well

export async function list(spec = 'latest') {
  // TODO: server SDK
  const { stdout } = await exec(`npm show "@miso.ai/client-sdk@${spec}" version --json`);
  let versions = JSON.parse(stdout);
  if (!Array.isArray(versions)) {
    versions = [versions];
  }
  versions.sort(compare);
  return versions;
}

export async function latest(spec) {
  const versions = await list(spec);
  return versions[versions.length - 1];
}

function compare(a, b) {
  const [a1, a2, a3] = a.split('.');
  const [b1, b2, b3] = b.split('.');
  if (a1 !== b1) {
    return Number(a1) - Number(b1);
  }
  if (a2 !== b2) {
    return Number(a2) - Number(b2);
  }
  return Number(a3) - Number(b3);
}

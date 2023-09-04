#!/usr/bin/env node
import 'dotenv/config';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { rimraf } from 'rimraf';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { exec, fileExists, versions, projects } from '../lib/index.js';

yargs(hideBin(process.argv))
  .env('MISO_EXAMPLES')
  .option('root-dir', {
    type: 'string',
    description: 'Root directory of the examples',
    default: 'examples',
  })
  .coerce('path', v => `${v}`)
  .command({
    command: 'clean [path]',
    handler: runClean,
  })
  .command({
    command: 'install [path]',
    handler: runInstall,
  })
  .command({
    command: 'upgrade [path]',
    handler: runUpgrade,
  })
  .command({
    command: 'run [path]',
    handler: runRun,
  })
  .help()
  .fail(handleFail)
  .parse();

async function runClean({ cwd, path, rootDir } = {}) {
  console.log(`Cleaning up ${path || 'all'} examples...`);
  const prefix = `${resolvePath({ cwd, rootDir, path })}/**`;
  await rmrfPattern(`${prefix}/node_modules`);
  await rmrfPattern(`${prefix}/package-lock.json`);
}

async function runInstall({ cwd, path, rootDir } = {}) {
  console.log(`Installing dependencies under ${path || 'all directories'}...`);
  for await (const dir of projects.list(resolvePath({ cwd, rootDir, path }))) {
    console.log(`Installing dependencies for ${dir}...`);
    const { stdout, stderr } = await exec('npm install', { cwd: dir });
    console.error(`${stderr}`);
    console.log(`${stdout}`);
  }
}

async function runUpgrade({ cwd, path, rootDir } = {}) {
  console.log(`Upgrading SDK version under ${path || 'all directories'}...`);

  const match = `/${path}/`.match(/\/(server|client)\/(\d+\.\d+)\//);
  if (!match || match[1] !== 'client') {
    throw new Error(`Not there yet.`);
  }
  const latest = await versions.latest(match[2]);
  console.log(`Latest SDK version: ${latest}`);

  for await (const dir of projects.list(resolvePath({ cwd, rootDir, path }))) {
    console.log(`Upgrading ${dir}...`);
    await projects.upgrade(dir, latest);
  }
}

async function runRun({ cwd, path, rootDir } = {}) {
  const projectDir = resolvePath({ cwd, rootDir, path });
  if (!(await fileExists(`${projectDir}/package.json`))) {
    throw new Error(`Not a project: ${projectDir}`);
  }
  spawn(`npm run start`, { cwd: projectDir, stdio: 'inherit', shell: true });
}

async function rmrfPattern(pattern) {
  console.log(`rm -rf ${pattern}`);
  await rimraf(pattern, { glob: true });
}

function resolvePath({ cwd = process.cwd(), rootDir = 'examples', path = '.' } = {}) {
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path.startsWith(rootDir) ? resolve(cwd, path) : resolve(cwd, rootDir, path);
}

function handleFail(msg, err) {
  if (err) {
    throw err;
  }
  console.error(msg);
  process.exit(1);
}

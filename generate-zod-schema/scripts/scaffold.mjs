import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const options = {};
for (let i = 0; i < args.length; i += 2) {
  const key = args[i];
  const value = args[i + 1];
  if (!['--target', '--name', '--registry', '--repository', '--version'].includes(key) || !value || options[key]) {
    throw new Error(`Invalid argument: ${key ?? '(missing)'}`);
  }
  options[key] = value;
}

const target = options['--target'];
const name = options['--name'];
const requestedRegistry = options['--registry'];
const repository = options['--repository'];
const version = options['--version'] ?? '0.1.0';

if (!target || !isAbsolute(target)) throw new Error('Provide an absolute --target directory');
if (!name || !/^(?:@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*|[a-z0-9][a-z0-9._-]*)$/.test(name)) {
  throw new Error('Provide a valid lowercase npm --name');
}
if (!requestedRegistry || !repository) throw new Error('Provide --registry and --repository (or none)');
if (!/^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/.test(version)) throw new Error('Invalid --version');

const registry = requestedRegistry === 'npmjs' ? 'https://registry.npmjs.org/'
  : requestedRegistry === 'github' ? 'https://npm.pkg.github.com/'
    : requestedRegistry;
if (!registry.startsWith('https://')) throw new Error('Registry must be npmjs, github, or an HTTPS URL');
const registryUrl = new URL(registry);
if (registryUrl.username || registryUrl.password || registryUrl.search || registryUrl.hash) {
  throw new Error('Registry URL cannot include credentials, query, or fragment');
}
if (requestedRegistry === 'github' && !name.startsWith('@')) throw new Error('GitHub Packages requires a scoped name');
if (repository !== 'none' && !/^(https:\/\/|git\+ssh:\/\/|git@)/.test(repository)) {
  throw new Error('Repository must be a Git HTTPS/SSH URL or none');
}
if (existsSync(target) && readdirSync(target).length !== 0) throw new Error(`Target must be empty: ${target}`);
if (!existsSync(dirname(target))) throw new Error(`Target parent does not exist: ${dirname(target)}`);

const starter = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/starter');
mkdirSync(target, { recursive: true });
cpSync(starter, target, { recursive: true, force: false, errorOnExist: true });

const packagePath = join(target, 'package.json');
const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
pkg.name = name;
pkg.version = version;
pkg.publishConfig = { registry: registryUrl.href };
if (repository !== 'none') pkg.repository = { type: 'git', url: repository };
writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);

if (requestedRegistry !== 'npmjs') {
  const scope = name.startsWith('@') ? name.split('/')[0] : null;
  const npmrc = scope ? `${scope}:registry=${registryUrl.href}\n` : `registry=${registryUrl.href}\n`;
  writeFileSync(join(target, '.npmrc'), npmrc);
}

const readmePath = join(target, 'README.md');
writeFileSync(readmePath, readFileSync(readmePath, 'utf8').replaceAll('__PACKAGE_NAME__', name).replaceAll('__REGISTRY__', registryUrl.href));
console.info(`Scaffolded ${name} at ${target}`);

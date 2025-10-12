import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import type { Config } from 'payload';
import payloadConfig from '../src/payload/payload.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const force = process.argv.includes('--force');

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = path.resolve(__dirname, '..');
}

async function loadGenerateImportMap() {
  const require = createRequire(import.meta.url);
  const payloadMain = require.resolve('payload');
  const payloadDistDir = path.dirname(payloadMain);
  const generateImportMapPath = path.join(payloadDistDir, 'bin/generateImportMap/index.js');
  const mod = await import(pathToFileURL(generateImportMapPath).href);
  return mod.generateImportMap;
}

(async () => {
  const generateImportMap = await loadGenerateImportMap();
  const maybeConfig = payloadConfig as Config | Promise<Config> | undefined;

  if (!maybeConfig) {
    throw new Error('Payload config is undefined. Ensure src/payload/payload.config.ts exports a config.');
  }

  const config: Config = typeof (maybeConfig as Promise<Config>).then === 'function'
    ? await (maybeConfig as Promise<Config>)
    : (maybeConfig as Config);

  if (!config.admin) {
    throw new Error('Payload config did not include admin settings. Ensure buildConfig is exported correctly.');
  }

  config.admin.importMap = config.admin.importMap ?? {};
  if (!config.admin.importMap.baseDir) {
    config.admin.importMap.baseDir = path.resolve(__dirname, '../src/payload');
  }

  await generateImportMap(config as Config, { force });
  console.log('✅ Payload import map generated');
})();


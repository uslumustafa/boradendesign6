import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {transform} from 'esbuild';

const root = new URL('./dist/', import.meta.url);
// Keep provenance in source control; ship licenses and on-page attributions.
const excluded = ['__compare', 'route-manifest.json', 'assets/SOURCES.md',
  'insan/people.mp4', 'insan/people-framing-v2.mp4', 'insan/people-short-v3.mp4', 'insan/people-short-v4.mp4',
  'assets/meeting-scroll-demo.mp4'];
for (const file of excluded) await fs.rm(new URL(file, root), {recursive:true, force:true});

const files = await fs.readdir(root, {recursive:true, withFileTypes:true});
let saved = 0, checked = 0;
for (const entry of files) {
  if (!entry.isFile()) continue;
  const file = path.join(entry.parentPath, entry.name);
  const relative = path.relative(root.pathname, file);
  assert(!/(^|\/)(\.[^/]+|node_modules|__compare|source-media|research)(\/|$)|\.(map|md|py|ts|mjs)$/.test(relative), `Development file in release: ${relative}`);
  let code;
  if (/\.(html|css|js|json|svg|txt)$/.test(file)) code = await fs.readFile(file, 'utf8');
  if (/\.(js|css)$/.test(file)) {
    const result = await transform(code, {
      loader:path.extname(file).slice(1), minify:true, sourcemap:false,
      legalComments:'eof', drop:['debugger'],
      pure:['console.log', 'console.debug', 'console.info', 'console.trace'],
    });
    saved += Buffer.byteLength(code) - Buffer.byteLength(result.code);
    code = result.code;
    await fs.writeFile(file, code);
  }
  if (code !== undefined) {
    // Fail without logging a credential value. Runtime warnings/errors stay intact.
    assert(!/AIza[\w-]{30,}|sk-(?:proj|ant)-[\w-]+|gh[pousr]_[\w]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/.test(code), `Possible credential in ${relative}`);
    assert(!/sourceMappingURL|\/Users\/|localhost:\d|127\.0\.0\.1:\d/.test(code), `Development reference in ${relative}`);
    if (file.endsWith('.js')) assert(!/console\.(log|debug|info|trace)\s*\(/.test(code), `Debug output in ${relative}`);
  }
  checked++;
}
for (const required of ['index.html','404.html','insan/index.html','insan/people-short-v5.mp4',
  'insan/world.js','insan/vendor/THREE-LICENSE.txt','assets/fonts/jost/OFL.txt']) {
  await fs.access(new URL(required, root));
}
console.log(`Release verified: ${checked} files; JS/CSS reduced by ${Math.round(saved / 1024)} KB. No deployment performed.`);

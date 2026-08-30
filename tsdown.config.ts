import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import { defineConfig } from 'tsdown';
import ast from 'unplugin-ast/rolldown';

const srcRoot = path.resolve(import.meta.dirname, 'src');
const outDir = path.resolve(import.meta.dirname, 'dist');
const copiedFiles: Set<string> = new Set();

export default defineConfig({
  entry: ['src/index.ts', 'src/db/asia/index.ts', 'src/db/international/index.ts'],
  plugins: [
    ast({
      transformer: [
        {
          onNode: (node) => node.type === 'ImportExpression',
          transform: async (node, _, context) => {
            if (!node.source.value.endsWith('.json')) {
              return node;
            }

            const resolvedPath = path.join(
              path.relative(srcRoot, path.dirname(context.id)),
              node.source.value
            );
            const srcPath = path.resolve(srcRoot, resolvedPath);
            const outPath = path.resolve(outDir, resolvedPath);

            if (!copiedFiles.has(srcPath)) {
              await fs.mkdir(path.dirname(outPath), { recursive: true });
              await fs.copyFile(srcPath, outPath);
              copiedFiles.add(srcPath);
            }

            return node;
          },
        },
      ],
    }),
  ],
  deps: {
    neverBundle: [/\.json$/],
  },
});

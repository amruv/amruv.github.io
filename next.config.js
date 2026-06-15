import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter
    ],
  },
});

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: '',
  basePath: '',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  transpilePackages: ['@shadergradient/react', 'three', 'three-stdlib', '@react-three/fiber'],
  webpack: (config) => {
    // @shadergradient/react only ships ESM (exports.".import" = ./dist/index.mjs)
    // with no CJS or "default" fallback. Webpack's default conditionNames don't
    // include "import", so we alias directly to the dist file.
    config.resolve.alias['@shadergradient/react'] = path.resolve(
      __dirname,
      'node_modules/@shadergradient/react/dist/index.mjs'
    )
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })
    return config
  },
}
export default withMDX(nextConfig)

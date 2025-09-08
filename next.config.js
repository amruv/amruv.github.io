const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        // require('remark-frontmatter'),
        await import('remark-frontmatter'),
        await import('remark-mdx-frontmatter')
     ], 
    },
  });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: '',
  basePath: '',
  pageExtensions: ['ts', 'tsx', 'mdx'],
}
module.exports = withMDX(nextConfig)

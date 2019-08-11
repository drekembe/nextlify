const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = {
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/papi': { page: '/papi' },
      'hapi': { page: '/papi' }
    };
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        use: 'frontmatter-markdown-loader'
      }
    )
    return cfg;
  }
};
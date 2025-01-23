// this simply tests the redirecting of the root path (source)
module.exports = {
  async redirects() {
    return [
      {
        source: "/c/:path*",
        destination: "https://forum.ceg.vote/c/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

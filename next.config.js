const withOffline = require("next-offline");
module.exports = withOffline({
  images: {
    domains: ["cdn.grants.art", "*.grants.art"],
  },
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? "service-worker.js"
      : "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /.png$/,
        handler: "NetworkFirst",
        options: {
          cacheName: "imageCache",
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*).jpg",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=18000, s-maxage=18000, stale-while-revalidate=18000",
          },
        ],
      },
      {
        source: "/(.*).png",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=18000, s-maxage=18000, stale-while-revalidate=18000",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=18000, s-maxage=18000, stale-while-revalidate=18000",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/service-worker.js",
        destination: "/_next/static/service-worker.js",
      },

      {
        source: "/follow",
        destination: "https://twitter.com/SevensGrant",
      },
    ];
  },
});

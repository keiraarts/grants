const withOffline = require("next-offline");
module.exports = withOffline({
  future: {
    webpack5: true,
  },
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
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        source: "/(.*).png",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=180, s-maxage=180, stale-while-revalidate=180",
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

      {
        source: "/",
        destination: "/home",
      },
    ];
  },
});

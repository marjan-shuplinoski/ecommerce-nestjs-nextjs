const withPWA = require("next-pwa")({
  dest: "public",
  // mode: 'production',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
});

const nextConfig = {
  /* config options here */
};

module.exports = withPWA(nextConfig);

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: ["http://localhost:3000"], // Ganti dengan URL Next.js Anda
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

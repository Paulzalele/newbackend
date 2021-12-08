module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true,  
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'b28e239dd89172f7ef889db6b1b49a9b'),
    },
  },
});

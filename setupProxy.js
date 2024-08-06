const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This should match the path of your API requests
    createProxyMiddleware({
      target: 'https://apex-plus-backend-xxx.vercel.app', // Backend API URL
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', // Removes /api from the URL path
      },
    })
  );
};

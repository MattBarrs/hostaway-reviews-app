const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000", // <-- set your backend port here
      changeOrigin: true,
      secure: false,
      onProxyReq(proxyReq, req, res) {
        proxyReq.removeHeader("cookie");
        proxyReq.removeHeader("referer");
        proxyReq.removeHeader("x-forwarded-for");
      },
    }),
  );
};

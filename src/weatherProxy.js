const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/foobar",
    createProxyMiddleware({
      target: "http://15.75.4.193:9777",
      changeOrigin: true,
      pathRewrite: {
        "^/foobar": "",
      },
    })
  );
  app.use(
    "/video",
    createProxyMiddleware({
      target: "http://15.112.168.117:8088",
      changeOrigin: true,
      pathRewrite: {
        "/video": "",
      },
    })
  );
  //   app.use(
  //     proxy("/fans/**", {
  //       target: "https://easy-mock.com/mock/5c0f31837214cf627b8d43f0/",
  //       changeOrigin: true
  //     })
  //   );
};

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8686",
            changeOrigin: true,
        })
    );
    app.use(
        "/login",
        createProxyMiddleware({
            target: "http://localhost:8686",
            changeOrigin: true,
        })
    )
}
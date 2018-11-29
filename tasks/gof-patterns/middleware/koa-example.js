const Koa = require('koa');

const app = new Koa();

app.use(async function(ctx, next) {
    ctx.body = {'now': new Date()};
}).listen(3000);

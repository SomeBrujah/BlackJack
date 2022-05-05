const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

app.use(serve(path.join(__dirname, 'public')));
const router = require('./routers/router');
app.use(router.routes());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));
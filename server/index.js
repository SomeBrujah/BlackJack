const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const { Game } = require('./test/game');
const { Player } = require('./test/players');
const app = new Koa();
const router = new Router();
let testCounter = 0;

const game = new Game([new Player('Jesica'), new Player('Jack')]);
game.start();

app.use(serve(path.join(__dirname, 'public')));

router.post('/hit', async (ctx) => {
    game.currentPlayer.hit();
});

router.post('/stand', async (ctx) => {
    game.currentPlayer.stand();
})


app.use(router.routes());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`));
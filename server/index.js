const Koa = require('koa');
const Router = require('koa-router');
const { Game } = require('./app/game');
const { Player } = require('./app/players');
const app = new Koa();
const router = new Router();

const game = new Game([new Player('Jesica'), new Player('Jack')]);
game.start();

router.post('/hit', async (ctx) => {
    game.currentPlayer.hit();
    ctx.body = game;
});

router.post('/stand', async (ctx) => {
    game.currentPlayer.stand();
    ctx.body = game;
})

router.post('/restart', async (ctx) =>{
    game = new Game([new Player('Jesica'), new Player('Jack')]);
    game.start();
    ctx.body = game;
})

app.use(router.routes());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`));
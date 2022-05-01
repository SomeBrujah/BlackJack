const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const { Game } = require('./app/game');
const { Player } = require('./app/players');
const serve = require('koa-static');
const app = new Koa();
const router = new Router();

let game = new Game([new Player('Jesica'), new Player('Jack')]);

app.use(serve(path.join(__dirname, 'public')));

const someMiddleWare = (ctx, next) => {
    // check tokens exist
    // check is token valid
    if (!OK) {
        ctx.statusCode = 401;
        return;
    }
    // If all is good
    return next();
}

router.post('/getGame', async (ctx) => {
    console.log('Game state is getted.');
    ctx.body = game;
})

router.post('/hit', async (ctx) => {
    console.log('Player hit');
    game.currentPlayerHit();
    ctx.body = game;
});

router.post('/stand', async (ctx) => {
    console.log('Player stand');
    game.currentPlayerStand();
    ctx.body = game;
})

router.post('/restart', async (ctx) => {
    game = new Game([new Player('Jesica'), new Player('Jack')]);
    ctx.body = game;
})

app.use(router.routes());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}...`));
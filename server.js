const Koa = require('koa');
const app = new Koa();
const json = require('koa-json')
let Router = require('koa-router');
let router = new Router();

const serve = require('koa-static')
app.use(serve('./myshop'))


let users = [
	// { id: 1, name: 'sky', phone: 1111111, email: 'k@gmail.com' },
	// { id: 2, name: 'Star', phone: 2222222, email: 'sss@gmail.com' },
	// { id: 3, name: 'Vick', phone: 3333333, email: 'V@gmail.com' },
]

router
	.get('/user', list)
	.get('/user/:id', detail)
	.post('/user/create', create)
	.post('/user/:id', update)
	.del('/user/:id', remove)
	
function list(ctx) {
	ctx.body = users
}

function detail(ctx) {
	ctx.body = users[ctx.params.id]
}

function create(ctx) {
	new_user = ctx.request.body
	users.push(new_user)
	ctx.body = users
}

function update(ctx) {
	ctx.body = Object.assign(users[ctx.params.id], ctx.request.body)
}

function remove(ctx) {
	users.splice(ctx.params.id, 1)
	ctx.body = users
}

app
	.use(json())
	.use(require('koa-body')())
    .use(router.routes())
	.use(router.allowedMethods())
	
    .listen(3000, function(){
   console.log('Server running on http://localhost:3000')
});
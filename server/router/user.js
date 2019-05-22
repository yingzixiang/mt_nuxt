const Router = require('koa-router')
const UserController = require('../controller/UserController')

const router = new Router();
router.prefix('/users')

//用户登录
// router.get('/', async UserController.)

//发送验证码
router.post('/sendCode', UserController.sendCode);
//注册
router.post('/register', UserController.registerUser);
//登录
router.post('/signin', UserController.signIn);
//登录验证
router.get('/getUser', UserController.getUser);

module.exports = router;
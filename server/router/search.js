const Router = require('koa-router')
const SearchController = require('../controller/SearchController')

const router = new Router();
router.prefix('/search')

//用户登录
// router.get('/', async UserController.)

//获取关键字列表
router.get('/resultsByKeywords', SearchController.buyKeywords);

module.exports = router;
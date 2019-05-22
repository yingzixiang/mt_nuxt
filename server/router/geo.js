const Router = require('koa-router')
const GeoController = require('../controller/GeoController')

const router = new Router();
router.prefix('/geo')

//获取当前定位
router.get('/getPosition', GeoController.getPosition);

module.exports = router;
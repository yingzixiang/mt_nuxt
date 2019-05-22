const axios = require('../middleware/axios')
const sign = '3bb84230a3a155fa4d39890d04e8b794'
var GeoController = {
    getPosition: async (ctx, next) => {
        ctx.body = {
            province: '浙江省',
            city: '杭州市'
        }
    }
}

module.exports = GeoController
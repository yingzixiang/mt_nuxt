const axios = require('../middleware/axios')

var SearchController = {
    buyKeywords: async (ctx, next) => {
        const {city, keyword} = ctx.query;
        let {
            status,
            data: {
                count,
                pois
            }
        } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
            params: {
                city,
                keyword,
                sign
            }
        })
        ctx.body = {
            count: status === 200 ? count : 0,
            pois: status === 200
            ? pois
            : []
        }
    }
}

module.exports = SearchController;
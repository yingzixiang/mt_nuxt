var query = require('./BaseModel');

// user表
exports.Users= {
    // 查询某个用户
    findOne: (name) => {
        let _sql = `select * from user where username=?`
        return query(_sql, name);
    },
    // 创建用户
    createUser: (value) => {
        let _sql = `insert into user (username, password, email) values (?,?,?)`
        return query(_sql, Object.values(value));
    }
}


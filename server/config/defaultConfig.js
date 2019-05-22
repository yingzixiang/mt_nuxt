const config = {
    // database: {
    //     DATABASE: 'mts',
    //     USERNAME: 'root',
    //     PASSWORD: 'Bls@2019',
    //     PORT: 3306,
    //     HOST: '192.168.32.210'
    // }
    database: {
        DATABASE: 'mts',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: 3306,
        HOST: 'localhost'
    },
    redis: {
        // get host() {
        //     return '127.0.0.1'
        // },
        // get port() {
        //     return 6379
        // }
        get host() {
            // return '192.168.32.210'
            return '127.0.0.1'
        },
        get port() {
            return 6379
        },
        get password() {
            // return 123456
            return ''
        }
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get user() {
            return '1350884566@qq.com'
        },
        get pass() {
            return 'ajbithdcmjsqhdhc'
        },
        get code() {
            return () => {
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        get expire() {
            return () => {
                return new Date().getTime()+60*60*1000
            }
        }
    }
}

module.exports = config
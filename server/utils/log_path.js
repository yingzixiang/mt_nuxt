const fs = require('fs')
const logConfig = require('../config/logConfig')

//确定目录是否存在，如果不存在则创建目录
var confirmPath = function (pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr)
    }
}

//初始化log相关目录
var initLogPath = function() {
    //创建log的根目录
    if(logConfig.baseLogPath) {
        confirmPath(logConfig.baseLogPath)
        //根据不同的logType创建不同的文件目录
        for(var i=0, len=logConfig.appenders.length; i<len; i++) {
            if(logConfig.appenders[i].path) {
                confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
            }
        }
    }
}

export default initLogPath;
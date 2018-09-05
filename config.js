'use strict'

module.exports = {
  mailer: {
    service: "Gmail",
    auth: {
      user: 'youremail@gmail.com',
      pass: 'pass'
    }
  },
  dbConnString: 'mongodb://127.0.0.1:27017/togethercode',
  sessionKey: 'TogetherCode'
}

const AV = require('../libs/av-weapp-min.js')
function fetch() {
  var query = new AV.Query('Daylist')  
  return query.find()     //返回一个promise对象(后面接的是.then)
}
function save(dataString) {
  var Daylist = AV.Object.extend('Daylist')
  var daylist = new Daylist()
  return daylist.save({
    content: dataString
  })    
}
function update(list) {
  var data = JSON.stringify(list)
  let daylist = AV.Object.createWithoutData('Daylist', '5bced2c50b6160006a57609a')
  daylist.save({
    content: data
  }).then(() => {
    console.log('更新成功')
  })
}
export {
  fetch,
  save
}

const Redis = require('ioredis');

const redis=new Redis();

redis.on('connect',()=>{
  console.log("Redis Connect")
})
redis.on('err',()=>{
  console.log("Redis Error")
})
module.exports = redis;

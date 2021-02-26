//开发环境
const dev = (() => process.env.NODE_ENV === 'development')();

//beta环境
const beta = (() => (!dev) && (/beta\./ig.test(window.location.host)))();

//生产环境
const prod = (() => (!dev && !beta))();

module.exports = {
  dev,
  beta,
  prod
};
module.exports = [{
  url: `/mock/data`,
  method: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}, {
  url: `/mock/data1`,
  method: 'post',
  response(req, res) {
    res.send({
      code: 200,
      data: {}
    });
  }
}, {
  url: `/mock/form`,
  method: 'get',
  response(req, res) {
    res.send({
      code: 200,
      data: {
        name: 'blue',
        age: 24,
        radio: 1
      }
    });
  }
}];
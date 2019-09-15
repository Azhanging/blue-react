const { copyDir } = require('../../../react-config/copy-dir');
const path = require('path');

function resolve(_path) {
  return path.join(__dirname, '../src', _path);
}

const middlewarePath = resolve('../../..');

copyDir({
  dirList: [{
    dirPath: path.join(middlewarePath,'components'),
    destPath: resolve(''),
    destDirName: 'public-components'
  },{
    dirPath: path.join(middlewarePath,'assets'),
    destPath: resolve(''),
    destDirName: 'public-assets'
  }]
});
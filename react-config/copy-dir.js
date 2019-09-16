/*
* 由于create-react-app的机制，不允许src外的文件走webpack，
* 只有通过copy dir同步外部文件到内容中去
* */

const fs = require('fs');
const path = require('path');

//检查文件夹是否存在
function hasDir(path) {
  return fs.existsSync(path);
}

//创建文件
function mkDir(path) {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdirSync(path);
      resolve();
    } catch (e) {
      reject();
    }
  }).catch((e) => {
    console.log(e);
  });
}

//是否在黑名单里面
function inBlockList(blackList, path) {
  for (let i = 0; i < blackList.length; i++) {
    const item = blackList[i];
    if (item.test(path)) {
      return true;
    }
  }
  return false;
}


function copyDir(opts = {
  dirList: [/*{
    dirPath: '',
    destPath: '',
    destDirName:''
  }*/],
  //黑名单
  blackList: []
}) {
  const { dirList, blackList = [] } = opts;
  (dirList || []).forEach((options) => {

    const { dirPath, destPath } = options;

    let { destDirName } = options;

    const splitDirPath = dirPath.split(process.platform === 'win32' ? '\\' : '/');

    if (!destDirName) {
      //获取文件路径最后名字
      destDirName = splitDirPath[splitDirPath.length - 1];
    }

    const destDirPath = path.join(destPath, destDirName);

    if (inBlockList(blackList, dirPath)) return;

    try {

      const files = fs.readdirSync(dirPath);

      //检查是否有当前的文件夹，没有则创建一个
      if (!hasDir(destDirPath)) {
        mkDir(destDirPath);
      }

      const dirList = [];

      (files || []).forEach((file) => {
        //当前的文件||文件夹
        const filePath = path.join(dirPath, file);
        const destFilePath = path.join(destDirPath, file);
        //如果是文件夹，递归操作
        if (fs.lstatSync(filePath).isDirectory()) {
          dirList.push({
            dirPath: filePath,
            destPath: destDirPath
          });
        } else {
          try {
            fs.copyFileSync(filePath, destFilePath);
          } catch (e) {
            console.log(e);
          }
        }
      });

      //下一层的文件夹
      if (dirList.length > 0) {
        copyDir({
          dirList,
          blackList
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
}

module.exports = {
  copyDir
};
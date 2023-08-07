#!/usr/bin/env node
// 引入node内置文件模块，获取本地文件
const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk');
const tempObj = require(`${__dirname}/../templates`);

inquirer.prompt([{
  type:"input",
  name:"tempName",
  message:"Please enter template name：",
  validate(val){
    if(!val) return "Template name is required"
    if(tempObj[val]) return "Template name already exists"
    // 用于结束当前这一命令输入
    return true;
  }
},{
  type:"input",
  name:"tempUrl",
  message:"Please enter template url：",
  validate(val){
    if(!val) return "Template url is required"
    return true;
  }
}]).then((res)=>{
      const {tempUrl, tempName} = res;
      tempObj[tempName] = tempUrl.replace(/[\u0000-\u0019]/g, '');
      // 把模板写入templates.json
      fs.writeFile(`${__dirname}/../templates.json`,  JSON.stringify(tempObj,null,4), 'utf-8',err=>{
        if (err) console.log(chalk.red(err));
        console.log(chalk.green('Added successfully! \n\n'));
        console.log("The latest template list is:");
        console.log(chalk.green.underline(Object.keys(tempObj).reduce((pre,cur)=>{
          return pre + '\n\n' + cur
        },'')))
      })
  })
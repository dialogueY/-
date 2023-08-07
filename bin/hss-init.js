#!/usr/bin/env node

// 交互式命令行，用户可以选择、输入命令，然后被js收集起来
const inquirer = require("inquirer");
const { program } = require('commander');
// 给输出的命令文本添加样式
const chalk = require('chalk');
// console.log(chalk.red("error"))
// 加载中样式
const ora = require("ora");
// 下载远端项目需要使用的库
const download = require("download-git-repo");

// 引入可以下载的模板
const tempObj = require(`${__dirname}/../templates.json`);
const fs = require('fs');
const ncp = require('ncp');

program.parse(process.argv);

// 定义用户选择的templateName
let templateName = "";
// 定义用户创建的项目名称，是需要写到本地文件夹的
let projectName = "";

const successFn = (spinner)=>{
  spinner.succeed();
  console.log(chalk.green("\n Generation completed!"));
  console.log(`
    \n To get started
    \n    cd ${projectName} \n
    \n    npm run dev \n`
  );
  process.exit();
}

// 下载脚手架的方法
const downProject = ()=>{
    const tempUrl = tempObj[templateName];
    console.log(chalk.white("\n Start generating... \n"));
    // 出现加载图标
    const spinner = ora("Downloading...");
    spinner.start();
    // 如果是本地文件直接复制文件夹
    if(tempUrl.includes(":")){
      fs.mkdirSync(projectName);
      ncp(tempUrl,`${__dirname}/../${projectName}`);
      successFn(spinner);
    }else {
      download(tempUrl,projectName,err=>{
        // 如果下载失败
        if(err){
          spinner.fail();
          console.log(chalk.red(`Generation failed. ${err}`));
          return;
        }
        // 如果下载成功给出提示
        successFn(spinner);
      })
    }
    
}

// 如果用户没有输入参数
if(program.args.length < 1) {
  // 开启询问
  inquirer.prompt([{
    // list表示给用户提供选择
    type:"list",
    name:"templateName",
    message:"Please choose a template：",
    choices:Object.keys(tempObj),
    validate(val){
      if(!val) return "请先使用hss-add创建模板"
    }
  }]).then((res)=>{
    // 选择了模板
    templateName = res.templateName;
    // 继续让用户输入项目名称
    inquirer.prompt([{
      type:"input",
      name:"projectName",
      message:"Please enter project name：",
      default:"hss-test"
    }]).then((res)=>{
      projectName = res.projectName;
      // 开始下载脚手架
      downProject();
    });
  })
}else {
  templateName = program.args[0];
  // 如果没有模板，输出不支持该模板
  if(!tempObj[templateName]){
    console.log(chalk.red("\n Template does not exit! \n "));
    return;
  }
  projectName = program.args[1];
  if(!projectName){
    projectName = "hss-test"
  }
  // 开始下载脚手架
  downProject();
}
#!/usr/bin/env node

const { program } = require('commander');

program
  // 当前版本
  .version("1.0.0")
  // 对当前脚手架的描述
  .description("我在这里添加了一个描述")
  // 添加一些描述
  .usage('<command> [options]')
  .command('help','这是一个脚手架，可以快速构建项目')
  .command('add','你可以添加模板，下次可以快速根据模板构建项目')
  .command('delete','你可以删除已经添加的模板')
  .command('list','查看所有内置的模板')
  .command('init','初始化一个项目')
  program.parse(process.aegv)
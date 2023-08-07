#!/usr/bin/env node
const tempObj = require(`${__dirname}/../templates.json`)
const chalk = require('chalk');
console.log(chalk.green.underline(Object.keys(tempObj).reduce((pre,cur)=>{
    return pre ? pre + '\n\n' + cur : pre + cur
},'')))
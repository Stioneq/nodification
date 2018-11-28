const tmpl = require('./template-engines');
const plain = require('./plain-engine');
const curly = require('./curly-engine');
const renderer = tmpl(plain);
const renderer2 = tmpl(curly);

renderer('1.html',{}).then(console.log);
renderer2('2.html',{title: 'new app'}).then(console.log);
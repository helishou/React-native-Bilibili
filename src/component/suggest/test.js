const data = require('./data');

console.log(data);
console.log('--------');
for (let key in data) {
  console.log(data[key], 'item');
}

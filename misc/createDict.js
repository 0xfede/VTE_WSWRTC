var fs = require('fs')

var data = fs.readFileSync('english.txt','utf8').split("\n");

var out = [];

for (var i = 0 ; i < data.length ; i++) {
  if (data[i].length == 5) out.push(data[i]);
}

console.log(out);

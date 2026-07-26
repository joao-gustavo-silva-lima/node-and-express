console.log(__dirname);
console.log(__filename);

const onlyFileName = __filename.replace(new RegExp(__dirname + "/"), "");

console.log(onlyFileName);
//console.log(process);

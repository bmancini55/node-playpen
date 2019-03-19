/**
 * Improve write performance by buffers 1024 writes and
 * concatinating them and then writes the final string to the stream
 *
 * - about 4x slower than JSON.stringify
 * - blocks caller
 */

module.exports = {
  stringify,
};

function stringify(stream, obj) {
  if (Array.isArray(obj)) writeArray(stream, obj);
  else if (typeof obj === 'object') writeObject(stream, obj);
  flush(stream);
}

let buffer = [];
let bufferi = 0;

function bwrite(stream, str) {
  buffer[bufferi] = str;
  bufferi++;
  if (bufferi === 2 ** 10) {
    flush(stream);
  }
}

function flush(stream) {
  let temp = '';
  for (let i = 0; i < bufferi; i++) {
    temp += buffer[i];
  }
  stream.write(temp);
  bufferi = 0;
}

////////

function writeVal(stream, val) {
  if (Array.isArray(val)) {
    writeArray(stream, val);
    return;
  }
  switch (typeof val) {
    case 'number':
    case 'boolean':
      bwrite(stream, val.toString());
      break;
    case 'string':
      bwrite(stream, `"${val}"`);
      break;
    case 'object':
      writeObject(stream, val);
      break;
  }
}

function writeObject(stream, obj) {
  bwrite(stream, '{');
  let hasKey = false;
  for (let key in obj) {
    if (hasKey) bwrite(stream, ',');
    bwrite(stream, `"${key}":`);
    writeVal(stream, obj[key]);
    hasKey = true;
  }
  bwrite(stream, '}');
}

function writeArray(stream, arr) {
  bwrite(stream, '[');
  let hasVal = false;
  for (let a of arr) {
    if (hasVal) bwrite(stream, ',');
    writeVal(stream, a);
    hasVal = true;
  }
  bwrite(stream, ']');
}

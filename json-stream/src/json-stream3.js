/**
 * Improve stream write performance by creating a single 4096-byte buffer
 * and writing to it until it needs to be flushed.
 *
 *
 * - 4x as fast JSON.stringify
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

let buffer = Buffer.alloc(2 ** 12);
let bufferi = 0;

function bwrite(stream, str) {
  let blen = str.length;
  if (bufferi + blen > buffer.length) {
    flush(stream);
  }
  buffer.write(str, bufferi);
  bufferi += blen;
}

function flush(stream) {
  if (buffer.length === bufferi) stream.write(buffer);
  else stream.write(buffer.slice(0, bufferi));
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

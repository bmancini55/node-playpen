/**
 * Stringify the object into a stream by continually calling buffer.write()
 * - will cause OOM exception for large files.
 * - will block caller
 */

module.exports = {
  stringify,
};

function stringify(stream, obj) {
  if (Array.isArray(obj)) writeArray(stream, obj);
  else if (typeof obj === 'object') writeObject(stream, obj);
}

function writeVal(stream, val) {
  if (Array.isArray(val)) {
    writeArray(stream, val);
    return;
  }
  switch (typeof val) {
    case 'number':
    case 'boolean':
      stream.write(val.toString());
      break;
    case 'string':
      stream.write(`"${val}"`);
      break;
    case 'object':
      writeObject(stream, val);
      break;
  }
}

function writeObject(stream, obj) {
  stream.write('{');
  let hasKey = false;
  for (let key in obj) {
    if (hasKey) stream.write(',');
    stream.write(`"${key}":`);
    writeVal(stream, obj[key]);
    hasKey = true;
  }
  stream.write('}');
}

function writeArray(stream, arr) {
  stream.write('[');
  let hasVal = false;
  for (let a of arr) {
    if (hasVal) stream.write(',');
    writeVal(stream, a);
    hasVal = true;
  }
  stream.write(']');
}

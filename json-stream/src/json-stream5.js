/**
 * Take the buffer approach but wrap with async/await
 * but make it wait after flushing.
 *
 * - slower than async/await message
 * - DOES NOT BLOCK
 * -
 */

module.exports = {
  stringify,
};

async function stringify(stream, obj) {
  if (Array.isArray(obj)) await writeArray(stream, obj);
  else if (typeof obj === 'object') await writeObject(stream, obj);
  await flush(stream);
}

let buffer = Buffer.alloc(2 ** 12);
let bufferi = 0;

async function bwrite(stream, str) {
  let blen = str.length;
  if (bufferi + blen > buffer.length) {
    await flush(stream);
  }
  buffer.write(str, bufferi);
  bufferi += blen;
}

async function flush(stream) {
  if (buffer.length === bufferi) stream.write(buffer);
  else stream.write(buffer.slice(0, bufferi));
  bufferi = 0;
  await pause(); // does this introduce a problem where we can write to the buffer out of order?
}

////////

function pause() {
  return new Promise(resolve => {
    setImmediate(resolve);
  });
}

async function writeVal(stream, val) {
  if (Array.isArray(val)) {
    await writeArray(stream, val);
    return;
  }
  switch (typeof val) {
    case 'number':
    case 'boolean':
      await bwrite(stream, val.toString());
      break;
    case 'string':
      await bwrite(stream, `"${val}"`);
      break;
    case 'object':
      await writeObject(stream, val);
      break;
  }
}

async function writeObject(stream, obj) {
  await bwrite(stream, '{');
  let hasKey = false;
  for (let key in obj) {
    if (hasKey) await bwrite(stream, ',');
    await bwrite(stream, `"${key}":`);
    await writeVal(stream, obj[key]);
    hasKey = true;
  }
  await bwrite(stream, '}');
}

async function writeArray(stream, arr) {
  await bwrite(stream, '[');
  let hasVal = false;
  for (let a of arr) {
    if (hasVal) await bwrite(stream, ',');
    await writeVal(stream, a);
    hasVal = true;
  }
  await bwrite(stream, ']');
}

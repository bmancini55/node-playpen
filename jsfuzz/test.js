module.exports = {
  fuzz,
};

function decode(buf) {
  if (!buf) throw new Error('Invalid buffer');
  if (buf.length < 3) throw new Error('Invalid buffer');
  if (buf[0] % 2 === 0) throw new Error('Invalid type');

  let type = buf.readUInt8(0);
  let len = buf.readUInt16BE(1);

  if (buf.length - 2 !== len) throw new Error('Invalid length');

  return {
    type,
    len,
    data: buf.slice(3, len),
  };
}

function fuzz(buf) {
  try {
    decode(buf);
  } catch (e) {
    if (
      e.message.indexOf('Invalid buffer') !== -1 ||
      e.message.indexOf('Invalid type') !== -1 ||
      e.message.indexOf('Invalid length') !== -1
    ) {
    } else {
      throw e;
    }
  }
}

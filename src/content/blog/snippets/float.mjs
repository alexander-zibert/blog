function sliceBits(num, startIndex, endIndex) {
  if (typeof num === "number" && num >= 0 && num <= Number.MAX_SAFE_INTEGER) {
    num = BigInt(num);
  }
  if (typeof num !== "bigint") {
    throw new Error("The number has to be a bigint!");
  }
  if (num < 0n) {
    throw new Error("Only unsigned numbers are supported!");
  }

  startIndex = BigInt(startIndex);
  endIndex = BigInt(endIndex);
  if (!(startIndex >= 0n)) {
    throw new Error("The start index has to be >= 0.");
  }
  if (!(endIndex > startIndex)) {
    throw new Error("The end index has to be greater than the start index.");
  }

  num >>= startIndex;

  // only the top bits
  const mask = (num >> (endIndex - startIndex)) << (endIndex - startIndex);

  return num ^ mask;
}

const buf = new ArrayBuffer(8);
const dv = new DataView(buf);

dv.setFloat32(0, -0.1);
const significand = sliceBits(dv.getUint32(0), 0, 23);
const exponent = sliceBits(dv.getUint32(0), 23, 31);
const sign = sliceBits(dv.getUint32(0), 31, 32);

console.log(significand);
console.log(exponent);
console.log(sign);

function zero() {}

function lt(a, b) {}
function gt(a, b) {}
function eq(a, b) {}
function eqz(num) {}

function neg(num) {}

function sub(a, b) {
  if (eqz(a)) {
    return neg(b);
  }
  if (eqz(b)) {
    return a;
  }

  // b == -n: a - b == a - (-n) == a + n == a + neg(b)
  if (lt(b, zero())) {
    return add(a, neg(b));
  }

  // b > 0, a == -n: a - b == (-n) - b == -(n+b) == -(neg(a) + b)
  if (lt(a, zero())) {
    return neg(add(neg(a), b));
  }

  // now a>0 and b>0, if b>a: a - b == -(b - a)
  if (gt(b, a)) {
    return neg(sub(b, a));
  }

  // now a>0 and b>0 and a>=b
}

const MAX_NUM = 2 ** 4;

function add(a, b) {
  const result = [];

  let carry = 0;
  for (let i = 0; i < Math.max(a.bytes.length, b.bytes.length); i += 1) {
    const sum = (a.bytes[i] || 0) + (b.bytes[i] || 0) + carry;
    const cur = sum % MAX_NUM;
    carry = Math.floor(sum / MAX_NUM);
    result.push(cur);
  }

  if (carry > 0) {
    result.push(carry);
  }
  return { bytes: result };
}

function BigInt26(s) {
  let sign = 0;

  const bytes = [];

  let i = 0;
  if (s[0] == "-") {
    sign = 1;
    i += 1;
  }

  let sum = 0;
  for (; i < s.length; i += 1) {
    sum *= 10;
    sum += ch.charCodeAt(i) - 48;
    if (sum > maxNum) {
      bytes.push(Math.floor(sum / maxNum));
      sum = sum % maxNum;
    }
  }
}

console.log(add({ bytes: [10, 12] }, { bytes: [7, 3] }));

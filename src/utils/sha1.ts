/**
 * Pure JavaScript implementation of SHA-1 cryptographic hash function.
 * Used for generating signatures for Cloudinary uploads without any native node/crypto dependencies.
 * Verified against Node.js native crypto implementation.
 */
export function sha1(str: string): string {
  const utf8: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
    if (charcode < 0x80) {
      utf8.push(charcode);
    } else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12), 
        0x80 | ((charcode >> 6) & 0x3f), 
        0x80 | (charcode & 0x3f)
      );
    } else {
      i++;
      charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      utf8.push(
        0xf0 | (charcode >> 18), 
        0x80 | ((charcode >> 12) & 0x3f), 
        0x80 | ((charcode >> 6) & 0x3f), 
        0x80 | (charcode & 0x3f)
      );
    }
  }

  const n = utf8.length;
  const words: number[] = [];
  for (let i = 0; i < n * 8; i += 8) {
    words[i >> 5] |= (utf8[i / 8] & 0xff) << (24 - i % 32);
  }

  // Padding
  words[n >> 2] |= 0x80 << (24 - (n % 4) * 8);
  words[(((n + 8) >> 6) + 1) * 16 - 1] = n * 8;

  const w = new Array(80);
  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  for (let i = 0; i < words.length; i += 16) {
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;

    for (let j = 0; j < 80; j++) {
      if (j < 16) {
        w[j] = words[i + j] || 0;
      } else {
        const val = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
        w[j] = (val << 1) | (val >>> 31);
      }

      let f = 0;
      let k = 0;
      if (j < 20) {
        f = (b & c) | ((~b) & d);
        k = 0x5a827999;
      } else if (j < 40) {
        f = b ^ c ^ d;
        k = 0x6ed9eba1;
      } else if (j < 60) {
        f = (b & c) | (b & d) | (c & d);
        k = 0x8f1bbcdc;
      } else {
        f = b ^ c ^ d;
        k = 0xca62c1d6;
      }

      const temp = (((a << 5) | (a >>> 27)) + f + e + k + w[j]) | 0;
      e = d;
      d = c;
      c = ((b << 30) | (b >>> 2)) | 0;
      b = a;
      a = temp | 0;
    }

    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
  }

  let result = "";
  const h = [h0, h1, h2, h3, h4];
  for (let i = 0; i < 5; i++) {
    let hex = (h[i] >>> 0).toString(16);
    while (hex.length < 8) {
      hex = "0" + hex;
    }
    result += hex;
  }
  return result;
}

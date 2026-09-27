import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, getPixel) {
  // 4 bytes per pixel (RGBA) + 1 filter byte per scanline
  const rowBytes = width * 4 + 1;
  const rawData = Buffer.alloc(rowBytes * height);

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowBytes;
    rawData[rowStart] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const offset = rowStart + 1 + x * 4;
      const [r, g, b, a] = getPixel(x, y, width, height);
      rawData[offset] = r;
      rawData[offset + 1] = g;
      rawData[offset + 2] = b;
      rawData[offset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // Helper to build chunk: length (4) + type (4) + data + crc32 (4)
  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = crc32(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([len, typeAndData, crcBuf]);
  }

  // Basic CRC32
  function crc32(buf) {
    let c = ~0;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (0xEDB88320 & -(c & 1));
      }
    }
    return ~c >>> 0;
  }

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA (6)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = chunk('IHDR', ihdrData);
  const idatChunk = chunk('IDAT', deflated);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Brand Icon Generator: dark chocolate (#050505 to #24130D), gold trim, hot pink unicorn horn and crown
function renderUnicornIcon(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2;
  const dist = Math.hypot(x - cx, y - cy);

  // Background radial gradient: #24130D in center, #050505 at edges
  const normDist = Math.min(dist / r, 1);
  let red = Math.round(36 * (1 - normDist) + 5 * normDist);
  let green = Math.round(19 * (1 - normDist) + 5 * normDist);
  let blue = Math.round(13 * (1 - normDist) + 5 * normDist);

  // Outer gold circle border at 90% radius
  const borderDist = Math.abs(dist - r * 0.9);
  if (borderDist < Math.max(2, w * 0.015)) {
    return [244, 201, 93, 255]; // #F4C95D (Luxury Gold)
  }

  // Crown & Horn shape in center
  const nx = (x - cx) / (r * 0.5);
  const ny = (y - cy) / (r * 0.5);

  // Horn: Triangle pointing up (-0.1 to 0.1 at base, ny from -0.8 to -0.1)
  if (ny >= -0.8 && ny <= -0.1) {
    const hornWidth = ((ny + 0.8) / 0.7) * 0.18;
    if (Math.abs(nx + 0.1) <= hornWidth) {
      return [244, 201, 93, 255]; // Gold horn
    }
  }

  // Crown base: ny between -0.15 and 0.05
  if (ny >= -0.15 && ny <= 0.05 && Math.abs(nx + 0.1) <= 0.35) {
    // Crown peaks
    if (ny < -0.05) {
      const peak1 = Math.abs(nx + 0.35) < 0.08;
      const peak2 = Math.abs(nx + 0.1) < 0.08;
      const peak3 = Math.abs(nx - 0.15) < 0.08;
      if (peak1 || peak2 || peak3) {
        return [244, 201, 93, 255];
      }
    } else {
      return [244, 201, 93, 255]; // Solid crown band
    }
  }

  // Mane waves: ny between -0.1 and 0.55
  if (ny > 0.05 && ny < 0.6 && nx < 0.05 && nx > -0.55) {
    // Sine wave ribbons
    const wave = Math.sin(ny * 10) * 0.15;
    if (Math.abs(nx - wave + 0.25) < 0.18) {
      return [244, 90, 168, 255]; // #F45AA8 (Hot Pink)
    }
    if (Math.abs(nx - wave + 0.1) < 0.14) {
      return [255, 154, 203, 255]; // #FF9ACB (Soft Pink)
    }
  }

  // Unicorn head profile: white silhouette
  if (ny > -0.05 && ny < 0.45 && nx >= -0.15 && nx <= 0.45) {
    const headDist = Math.hypot(nx - 0.15, ny - 0.18);
    if (headDist < 0.32) {
      // Small sweet closed eye
      if (Math.abs(nx - 0.18) < 0.04 && Math.abs(ny - 0.15) < 0.02) {
        return [36, 19, 13, 255];
      }
      // Rosy cheek
      if (Math.hypot(nx - 0.18, ny - 0.25) < 0.07) {
        return [255, 154, 203, 220];
      }
      return [255, 244, 222, 255]; // #FFF4DE Creamy White
    }
  }

  return [red, green, blue, 255];
}

const sizes = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'pwa-maskable-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.ico', size: 32 }
];

for (const { name, size } of sizes) {
  const buf = createPNG(size, size, renderUnicornIcon);
  fs.writeFileSync(`public/${name}`, buf);
  console.log(`Generated public/${name} (${size}x${size}, ${buf.length} bytes)`);
}

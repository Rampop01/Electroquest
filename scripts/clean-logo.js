const sharp = require('sharp');
const fs = require('fs');

async function cleanLogo() {
  const inputPath = 'public/electroquest-logo.jpg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const getPixel = (x, y) => {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  };

  const setPixel = (x, y, rgb, alpha = 1.0) => {
    const idx = (y * width + x) * channels;
    if (alpha >= 1.0) {
      data[idx] = rgb[0];
      data[idx + 1] = rgb[1];
      data[idx + 2] = rgb[2];
    } else {
      data[idx] = Math.round(data[idx] * (1 - alpha) + rgb[0] * alpha);
      data[idx + 1] = Math.round(data[idx + 1] * (1 - alpha) + rgb[1] * alpha);
      data[idx + 2] = Math.round(data[idx + 2] * (1 - alpha) + rgb[2] * alpha);
    }
  };

  // We want to replace the top text 'ELECTROQUEST' in box:
  // x from 160 to 864, y from 90 to 200
  //
  // Notice the diagonal carbon fiber pattern repeats every ~8 pixels diagonally (dx = +8, dy = +8).
  // More simply, at y = 15 to 85, the background is pristine carbon fiber.
  // The vertical offset dy = -75 has identical diagonal phase (modulo carbon weave)!
  // Let's test the weave periodicity along diagonal.
  // A clean source of background for any pixel (x, y) in the top area is (x, y - 80)
  // because y in [95..200] maps to y in [15..120], where there is zero text!

  // Top text removal: y in [95..198], x in [160..864]
  for (let y = 95; y <= 198; y++) {
    for (let x = 160; x <= 864; x++) {
      // Calculate feathering near the boundaries to ensure silky-smooth transition
      let alpha = 1.0;
      if (y < 105) alpha = (y - 95) / 10;
      else if (y > 192) alpha = (198 - y) / 6;
      if (x < 175) alpha = Math.min(alpha, (x - 160) / 15);
      else if (x > 850) alpha = Math.min(alpha, (864 - x) / 14);

      // Clone carbon texture from y - 80 (where y in [15..118] is pure pristine carbon background)
      const srcY = y - 80;
      const srcX = x;
      const srcRgb = getPixel(srcX, srcY);
      setPixel(x, y, srcRgb, alpha);
    }
  }

  // Bottom text removal 'EQ': y in [865..940], x in [410..614]
  // Clean source for bottom text is y + 80 (y in [945..1020] is pure pristine carbon background)
  for (let y = 865; y <= 940; y++) {
    for (let x = 410; x <= 614; x++) {
      let alpha = 1.0;
      if (y < 875) alpha = (y - 865) / 10;
      else if (y > 932) alpha = (940 - y) / 8;
      if (x < 425) alpha = Math.min(alpha, (x - 410) / 15);
      else if (x > 600) alpha = Math.min(alpha, (614 - x) / 14);

      const srcY = y + 80;
      const srcX = x;
      if (srcY < height) {
        const srcRgb = getPixel(srcX, srcY);
        setPixel(x, y, srcRgb, alpha);
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .jpeg({ quality: 98 })
    .toFile('public/electroquest-logo.jpg');

  // Also write to public/logo.png
  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toFile('public/logo.png');

  console.log('Clean pure emblem generated successfully!');
}

cleanLogo();

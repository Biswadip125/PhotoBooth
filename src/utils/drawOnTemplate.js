export const drawOnTemplate = async (photos, templateSrc) => {
  // loading the template image
  const template = new Image();
  template.src = templateSrc;
  await new Promise((resolve) => (template.onload = resolve));

  //creating a canvas
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const ctx = canvas.getContext("2d");

  //drawing the template first
  ctx.drawImage(template, 0, 0);

  //defining the sizes and gaps
  const blockWidth = 552;
  const blockHeight = 388;

  const startX = 24;
  const startY = 43;
  const gapX = 48;
  const gapY = 25;

  for (let i = 0; i < photos.length; i++) {
    const image = new Image();
    image.src = photos[i];
    await new Promise((res) => (image.onload = res));

    const col = i % 2;
    const row = Math.floor(i / 2);

    const x = startX + col * (blockWidth + gapX);
    const y = startY + row * (blockHeight + gapY);

    ctx.drawImage(image, x, y, blockWidth, blockHeight);
  }

  return canvas.toDataURL("image/jpeg", 0.9);
};

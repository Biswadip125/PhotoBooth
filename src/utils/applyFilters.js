export const applyFilter = async (imageUrl, filterType) => {
  const image = new Image();
  image.src = imageUrl;
  await new Promise((res) => (image.onload = res));

  //creatung the canvas for the image to apply filter
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");

  //choose Filter
  switch (filterType) {
    case "grayscale":
      ctx.filter = "grayscale(100%)";
      break;

    case "sepia":
      ctx.filter = "sepia(100%)";
      break;

    default:
      ctx.filter = "none";
  }

  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.9);
};

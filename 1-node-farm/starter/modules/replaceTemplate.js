module.exports = replaceTemplate = (product, template) => {
  let output = template.replace(/{% PRODUCT_IMAGE %}/g, product.image);
  output = output.replace(/{% PRODUCT_NAME %}/g, product.productName);
  output = output.replace(/{% PRODUCT_QUANTITY %}/g, product.quantity);
  output = output.replace(/{% PRODUCT_PRICE %}/g, product.price);
  output = output.replace(/{% PRODUCT_ID %}/g, product.id);

  output = output.replace(/{% PRODUCT_ORIGIN %}/g, product.origin);
  output = output.replace(/{% PRODUCT_NUTRIENT %}/g, product.nutrient);
  output = output.replace(/{% PRODUCT_DESC %}/g, product.description);

  if (!product.organic)
    output = output.replace(/{% NOT_ORGANIC %}/g, "not-organic");

  return output;
};

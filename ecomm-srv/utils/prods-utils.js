const checkProdFieldsPresent = (req) => {
  if (
    req.sku === null ||
    req.sku === undefined ||
    req.sku === "" ||
    req.pid === null ||
    req.pid === undefined ||
    req.pid === "" ||
    req.slug === null ||
    req.slug === undefined ||
    req.slug === "" ||
    req.model === null ||
    req.model === undefined ||
    req.model === "" ||
    req.colorway === null ||
    req.colorway === undefined ||
    req.colorway === "" ||
    req.category === null ||
    req.category === undefined ||
    req.category === "" ||
    req.brand === "" ||
    req.brand === null ||
    req.brand === undefined ||
    req.gen === "" ||
    req.gen === null ||
    req.gen === undefined ||
    req.priceRetail === null ||
    req.priceRetail === undefined ||
    req.priceRetail === "" ||
    req.price === null ||
    req.price === undefined ||
    req.price === "" ||
    req.desc === null ||
    req.desc === undefined ||
    req.desc === "" ||
    req.tags === null ||
    req.tags === undefined ||
    req.tags === "" ||
    req.led_wall_slug === null ||
    req.led_wall_slug === undefined ||
    req.led_wall_slug === "" /* || 
      req.images === null ||
      req.images === undefined ||
      req.images === "" */
  ) {
    return true;
  }
};

module.exports = {
  checkProdFieldsPresent,
};

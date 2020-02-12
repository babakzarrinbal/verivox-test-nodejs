const exp = {};

exp.product = function(prod) {
  let product = {};
  // manually setting schema for product ( we don't have database !!! or ORM)
  [
    "id",
    "name",
    "durationUnit",
    "usageUnit",
    "currency",
    "baseCost",
    "minCost",
    "minCostUsage",
    "minCostDuration",
    "consumptionCost"
  ].forEach(k => (product[k] = prod[k] || null));

  product.Anualcalculation = function(consumption, duration = 12) {
    const error = message => ({ error: { message }, data: null });
    if (this.minCostDuration && duration % this.minCostDuration)
      return error("can't calculate this product in given period");
    // setting response info can be done also with validation,etc...
    const result = {};

    // to add extra info on result
    /*
      [
        "name",
        "consumption",
        "usageUnit",
        "currency",
        "durationUnit"
      ].forEach(k => (result[k] = this[k]));
      result.duration = duration;
      */
    // calculating cost
    const durationMlty = this.minCostDuration
      ? duration / this.minCostDuration
      : 0;
    const mincost = (this.minCost || 0) * durationMlty;
    const baseCost = (this.baseCost || 0) * duration;
    const consumptionCost = (this.minCost
      ? consumption > this.minCostUsage * durationMlty
        ? consumption - this.minCostUsage * durationMlty
        : 0
      : consumption) * (this.consumptionCost || 0);

    return {
      data: mincost + baseCost + consumptionCost,
      error: null
    };
  };
  return product;
};

module.exports = exp;

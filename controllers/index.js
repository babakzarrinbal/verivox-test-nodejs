const exp = {};
const adapter = require("../adapters/staticdata");
const dataModels = require("../models/data/product");

exp.getProduct = (req, res) => {
  let id = req.params.id || req.query.id;
  if (!id)
    return res.status(400).json({ error: "No Id specified", data: null });
  return res.json({ error: null, data: adapter.getOne({ id }) });
};

exp.getProductAnnualConsumption = (req, res) => {
  let id = Number(req.params.id || req.query.id);
  let consumption = Number(req.params.consumption || req.query.consumption);
  if (!id || !consumption)
    return res
      .status(400)
      .json({ error: "No Id or consumption specified", data: null });

  let prodmodel = dataModels.product(adapter.getOne({ id }));
  let { data, error } = prodmodel.Anualcalculation(consumption);
  return res.json({
    data: { tariffName: prodmodel.name, annualCost: data || error },
    error: null
  });
};

exp.productsList = (req, res) => {
  let consumption = Number(req.params.consumption);

  let alldata = adapter.get();
  let result = alldata.map(p => {
    let prodmodel = dataModels.product(p);
    r = {
      tariffName: p.name,
      usageRate: p.usageRate,
      currency: p.currency
    };
    if (consumption) {
      let { data, error } = prodmodel.Anualcalculation(consumption);
      r["annualCost"] = data || error;
    }
    return r;
  });
  let sortby = req.query.sortby || "annualCost";
  let sortorder = req.query.sortorder || "asc";

  result.sort((a, b) =>
    (sortorder == "asc"
    ? a[sortby] > b[sortby]
    : a[sortby] < b[sortby])
      ? 1
      : -1
  );
  if (req.query.view == 'html') {
    return res.send(`
    <table>
    <tr>
      <th>Tariff name</th>
      <th>Annual Cost</th>
    </tr>
    ${result.reduce(
      (cu, r) =>
        cu +
        "<tr><th>" +
        r.tariffName +
        "</th><th>" +
        r.annualCost +
        " " +
        r.currency +
        "</th></tr>",""
    )}
    </table>
    `);
  }
  return res.json({ data: result, error: null });
};

module.exports = exp;

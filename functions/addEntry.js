var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

exports.handler = async (event, context, cb) => {
  try {
    const data = JSON.parse(event.body);
    console.log(data);

    const records = await base(process.env.AIRTABLE_ENTRIES).create([
      {
        fields: {
          item: data.fields.item,
          units: data.fields.units,
          date: data.fields.date,
        },
      },
    ]);
    records.forEach(function (record) {
      console.log(record.getId());
    });

    return {
      statusCode: 200,
      body: JSON.stringify(records),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};

var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

exports.handler = async (event, context, cb) => {
  try {
    const data = JSON.parse(event.body);
    console.log(data.fields.id);

    const deletedRecord = await base(process.env.AIRTABLE_ENTRIES).destroy(id);
    console.log("Deleted record", deletedRecord.id);
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

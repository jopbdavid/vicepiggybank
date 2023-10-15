var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE
);

exports.handler = async (event, context, cb) => {
  try {
    const id = event.queryStringParameters.id;
    console.log(id);

    const deletedRecord = await base(process.env.AIRTABLE_ENTRIES).destroy([
      id,
    ]);
    console.log("Deleted record", deletedRecord[0].id);
    return {
      statusCode: 200,
      body: JSON.stringify(deletedRecord[0].id),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err.message),
    };
  }
};

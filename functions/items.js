const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");
const airtable = new Airtable({
  endpointUrl: "https://api.airtable.com/v0/appNiSW6Wp0N1Zjoi/viceItems",
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });
    console.log(response);
    return {
      statusCode: 200,
      body: "items route",
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "There was an error",
    };
  }
};

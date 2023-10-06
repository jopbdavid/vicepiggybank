const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      let item = await airtable.retrieve(id);

      if (item.error) {
        return {
          statusCode: 400,
          body: `No product with id:${id}`,
        };
      }
      item = { id: item.id, ...item.fields };

      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Server error",
      };
    }
  }
  return {
    statusCode: 400,
    body: "Please provide item id",
  };
};

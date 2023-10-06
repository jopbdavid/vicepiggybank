const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_ENTRIES);

exports.handler = async (event, context, cb) => {
  const data = JSON.parse(event.body);

  console.log(data.newEntry);
  const newEntry = {
    fields: {
      item: data.newEntry.item,
      units: data.newEntry.units,
      date: data.newEntry.date,
    },
  };
  console.log(newEntry);

  try {
    let item = await airtable.create(newEntry);

    if (item.error) {
      console.log(item.error);
      return {
        statusCode: 400,
        body: JSON.stringify(item.error),
      };
    }
    item = { id: item.id, ...item.fields };

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};

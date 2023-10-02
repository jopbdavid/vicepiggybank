const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    const items = response.records.map((item) => {
      console.log(item);
      const { id, fields } = item;
      const {
        notes,
        brand,
        priceUnit,
        qntWeek,
        category,
        item,
        photo,
        costWeek,
        costMonth,
        costYear,
      } = fields;

      const imgUrl = photo[0].url;
      console.log(items);

      return {
        notes,
        brand,
        priceUnit,
        item,
        category,
        qntWeek,
        imgUrl,
        costWeek,
        costMonth,
        costYear,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "There was an error",
    };
  }
};

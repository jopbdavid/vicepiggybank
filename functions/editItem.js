const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const { id } = event.queryStringParameters;
    console.log(id);

    if (!id) {
      return {
        statusCode: 400,
        body: `No product with id:${id}`,
      };
    }
    let { projectedWeeklyUnits } = JSON.parse(event.body);
    projectedWeeklyUnits = parseInt(projectedWeeklyUnits);
    console.log(projectedWeeklyUnits);

    let updatedItem = await airtable.update(id, {
      qntWeek: projectedWeeklyUnits,
    });
    console.log(updatedItem);
    updatedItem = {
      id: updatedItem.id,
      qntWeek: updatedItem.fields.qntWeek,
      costWeek: updatedItem.fields.costWeek.toFixed(2),
      costMonth: updatedItem.fields.costMonth.toFixed(2),
      costYear: updatedItem.fields.costYear.toFixed(2),
    };

    console.log(updatedItem);

    if (updatedItem.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: `Could not update product with id:${id}`,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};

// Auto-Increment of Emp Code from 1 to infinity

const userSchema = require("../zuper/users/model/user.model");

// {} - Query Filter ({}): This specifies conditions that the document must meet for the query to match. In this case, an empty object {} means that there are no specific conditions, and it will match any document in the collection.

// {} - Projection ({}): This defines which fields to include or exclude from the query result. In the provided code, the second empty object {} means no projection is applied, and all fields will be included in the returned document.

// {sort: { empCode: -1 }}: Options ({ sort: { empCode: -1 } }): This allows you to specify additional options for the query. In this case, the option { sort: { empCode: -1 } } is provided to sort the documents based on the empCode field in descending order (-1 indicates descending order).

async function employeeCode ()  {
  try {
    const employeeDetails = await userSchema.findOne( {}, {},
      { sort: { empCode: -1 } }
    );

    if (employeeDetails) return employeeDetails.empCode + 1;
    else return 1;
  } catch (error) {
    console.error("Error in auto increment", error);
  }
};

module.exports = { employeeCode };

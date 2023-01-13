const generateError = require("../helpers/generateError");

// exports.queryOperations = async (req, res, next) => {
//   try {
//   } catch (err) {
//     return res.status(400).json({
//       status: "failed",
//       error: err.message,
//     });
//   }
// };

exports.queryOperations = (model) => {
  return async (req, res, next) => {
    try {
      let query = { ...req.query };
      const excludedFields = ["sort", "page", "limit", "fields", "tag"];
      excludedFields.map((field) => delete query[field]);
      query = JSON.stringify(query);
      query = query.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      query = JSON.parse(query);

      let result = model.find(query);
      // if(req.query.category){
      //   result = result.
      // }
      if (req.query.tag) {
        const tag = req.query.tag;
        result = model.find({ tags: { $in: [tag] } });
      }
      if (req.query.teacher) {
        const teacher = req.query.teacher;
        result = model.find({ teachers: { $in: [teacher] } });
      }
      if (req.query.sort) {
        const sortBy = req.query?.sort?.split(",").join(" ");
        // console.log("sort", req.query, sortBy);
        result = result.sort(sortBy);
      }
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        result = result.select(fields);
      }
      if (req.query.page && req.query.limit) {
        const limit = req.query.limit * 1;
        const page = req.query.page * 1;
        const skip = limit * (page - 1);
        const totalDocs = await model.countDocuments();
        if (skip >= totalDocs)
          return generateError(req, res, 400, "This page does not exist");
        result = result.skip(skip).limit(limit);
      }
      req.result = result;
      next();
    } catch (err) {
      next(err);
    }
  };
};

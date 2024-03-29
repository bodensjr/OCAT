const { AssessmentService } = require(`../../microservices`);
const { ResponseHandler } = require(`../../utils`);

const BASE_URL = `/assessment`;

module.exports = server => {

  server.post(
    `${ BASE_URL }/submit`,
    async (req, res, next) => {
      try {
        const { assessment } = req.params;
    
        console.log(assessment);
        AssessmentService.submit(assessment)
    
        ResponseHandler(
          res,
          `Submitted assessment`,
          {},
          next
        );
      } catch (err) {
        next(err);
      }
    }
  );
  
   server.get(
    `${ BASE_URL }/retrieve`,
    async (req, res, next) => {
      try {

        const assessmentList = await AssessmentService.retrieve();


        ResponseHandler(
          res,
          'Retrieved Assessments successfully',
          assessmentList,
          next
        );
      } catch (err) {
        console.log(err)
        next(err);
      }
    }
  );
};

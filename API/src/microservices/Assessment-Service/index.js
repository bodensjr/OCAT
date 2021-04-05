const { Assessments } = require(`../Database`);

exports.submit = (assessment) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      const Date = new Date();
      const DateCreated = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const answers = { 
        'cat_name': assessment.Name,
        'cat_date_of_birth':assessment.DateOfBirth,
        'instrument': assessment.instrument,
        'score': assessment.score,
        'risk_level': assessment.riskLevel,
        'created_at': DateCreated,
        'deleted_at': null
      }
      
        var document = await new Assessments(answers).save().catch(function (e) {
        resolve(document);
      });

      resolve(document);


      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

exports.retrieve = (assessment) => {
  return new Promise(async (resolve, reject) => { //eslint-disable-line
    try {
      let List = await new Assessments().fetchAll().catch(function (e) {
         resolve(List.toJSON());
});
         resolve(List.toJSON());

   } catch (err) {
      reject();
   }
  });
};

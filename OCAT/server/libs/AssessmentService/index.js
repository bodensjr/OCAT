let request = require(`request`);
const config = require(`../Config`);

exports.submit = ( assessment ) => {
    return new Promise((resolve, reject) => {
  

      const options = {
          uri: `http://${ config.api.url}/assessment/submit/`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            assessment: assessment
          },
          json: true
      };

    request(options, (error, response) => {
      if (error == null) {
        resolve(response);
      }
      if (error != null) {
        reject(error);
      }
    });
  });

};
exports.retrieve = (  ) => {
  return new Promise((resolve, reject) => {

    const options = {
        uri: `http://${ config.api.url}/assessment/retrieve/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        json: true
    };
    request(options, (error, response) => {
      if(error == null){
        resolve(response);
      }
      if(error != null){
        reject(error);
      }
    });
  });
}; 

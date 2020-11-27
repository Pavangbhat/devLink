var axios = require("axios");

export default function (userId) {
  var data = JSON.stringify({ userId: userId });
  console.log(data);
  var config = {
    method: "get",
    url: "http://localhost:5000/api/avatar",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

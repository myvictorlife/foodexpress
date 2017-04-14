var request = require('request');

var sendMessage = function(device, message, img, title) {
  
  var restKey = 'YTk5NDM3NzUtYTg4MS00NDJmLWI3ZjgtZTE2MTI2Y2IyYzM4';
  var appID = '18df0c5d-e388-45c6-b3a1-020d30122130';
  request({
      method: 'POST',
      uri: 'https://onesignal.com/api/v1/notifications',
      headers: {
        "authorization": "Basic " + restKey,
        "content-type": "application/json"
      },
      json: true,
      body: {
        'app_id': appID,
        'contents': {
          en: message,
        },
        large_icon: img,
        headings: {
          en: title,
        },
        'include_player_ids': Array.isArray(device) ? device : [device]
      }
    },
    function(error, response, body) {
      if (!body.errors) {
        console.log(body);
      } else {
        console.error('Error:', body.errors);
      }

    }
  );
}

module.exports = sendMessage
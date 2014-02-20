var clientId = '1094307263361-6q6u8m0ljv8fdor650pji75a7m5sjbfh.apps.googleusercontent.com';
        //var apiKey = 'AIzaSyBHpfRmJmv5R9eS93EiIhcbz1fBy2Ix8q0';
        var scopes = 'https://www.googleapis.com/auth/calendar';

        function handleClientLoad() {
          // Step 2: Reference the API key
          //gapi.client.setApiKey(apiKey);
          window.setTimeout(checkAuth,1);
        }

        function checkAuth() {
          gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
        }

        function handleAuthResult(authResult) {
          if (authResult && !authResult.error) {
            makeApiCall();
          } else {
            handleAuthClick();
          }
        }

        function handleAuthClick() {
          // Step 3: get authorization to use private data
          gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
          return false;
        }

        // Load the API and make an API call.  Display the results on the screen.
        function makeApiCall() {

          // Step 4: Load the Calendar API
          gapi.client.load('calendar', 'v3', function() {

            // Step 5: Assemble the API request
            var date = new Date();
            var request_show = gapi.client.calendar.events.list({
              'calendarId': 'come.gaillard@hetic.net',
              'startDate': date
            });

            // Step 6: Execute the API request
            request_show.execute(function(resp) {
              for (var i = 0; i < resp.items.length; i++) {
                var li = document.createElement('li');
                  li.appendChild(document.createTextNode(resp.items[i].summary));
                  if(resp.items[i].start != undefined && resp.items[i].start != "undefined")
                    li.appendChild(document.createTextNode(resp.items[i].start.dateTime));
                  document.getElementById('events').appendChild(li);
              }
            });

            var request_calendar_insert = gapi.client.calendar.calendars.insert({
              "resource" :{
                "summary": "u&me",
                "description": "Généré par www.u&me.eu",
                "location" : "France",
                "timezone": "France/Paris"
              }
            });

            // Step 6: Execute the API request
            var test = request_calendar_insert.execute()

            // CALENDAR HERE

          });
        }
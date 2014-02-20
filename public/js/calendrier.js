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

        function makeApiCall() {
          // Calendar API v3
          gapi.client.load('calendar', 'v3', function() {

            // Calendrier déjà présent ? --------------------
            var calendrier_present = false;
            var test_calendrier = false;
            var calendrier_uandme_id;
            var request_calendar_list = gapi.client.calendar.calendarList.list();
            // Effectue la recherche
            request_calendar_list.execute(function(resp){
              for (var i = 0; i < resp.items.length; i++){
                if(resp.items[i].summary == "u&me"){
                  calendrier_uandme_id = resp.items[i].id;
                  calendrier_present = true;
                }
                test_calendrier = true;
              }
              // Calendrier absent -> création
              if(!calendrier_present && test_calendrier){
                create_new_uandme();
              }
              // Calendrier présent -> récup evenements
              else {
                recup_events_uandme(calendrier_uandme_id);
              }
            });

            function create_new_uandme() {
              var request_calendar_insert = gapi.client.calendar.calendars.insert({
                "resource" :{
                  "summary": "u&me",
                  "description": "Généré par www.u&me.eu",
                  "location" : "France",
                  "timezone": "France/Paris"
                }
              });
              var test = request_calendar_insert.execute()
            }

            function recup_events_uandme(calendrier_id) {
              // Recherche des events suivants sur le calendrier
              var date = new Date();
              var request_show = gapi.client.calendar.events.list({
                'calendarId': calendrier_id
              });

              // Step 6: Execute the API request
              request_show.execute(function(resp) {
                if(resp.items != undefined) {
                  for (var i = 0; i < resp.items.length; i++) {
                  var li = document.createElement('li');
                    li.appendChild(document.createTextNode(resp.items[i].summary));
                    li.appendChild(document.createTextNode(resp.items[i].start.dateTime));
                    document.getElementById('events').appendChild(li);
                  }
                } else {
                  var erreur = document.createElement('p');
                  erreur.innerHTML = "Aucun évènement trouvé.";
                  document.getElementById('events').appendChild(erreur);
                }
              });
            }

            // CALENDAR HERE

          });
        }
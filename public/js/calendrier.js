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
          
            // Variable générales --------------------
            var calendrier_uandme_id;
            var calendrier_present = false;
            var test_calendrier = false;

            // Calendrier déjà présent ? --------------------
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
                create_new_calendar();
              }
              // Calendrier présent -> récup evenements
              else {
                recup_events_uandme(calendrier_uandme_id);
              }
            });

            // Création du calendrier --------------------
            function create_new_calendar() {
              var request_calendar_insert = gapi.client.calendar.calendars.insert({
                "resource" :{
                  "summary": "u&me",
                  "description": "Généré par www.u&me.eu",
                  "location" : "France",
                  "timezone": "France/Paris"
                }
              });
              request_calendar_insert.execute(function(resp) {
                calendrier_uandme_id = resp.id;
              });

              recup_events_uandme(calendrier_uandme_id);
            }

            // Récupération des events --------------------
            function recup_events_uandme(calendrier_id) {
              var date = new Date();
              var request_show = gapi.client.calendar.events.list({
                'calendarId': calendrier_id,
                'timeMin': date
              });
              request_show.execute(function(resp) {
                if(resp.items != undefined) {
                  $("#events").empty();
                  for (var i = 0; i < resp.items.length; i++) {
                    // Affichage correct de la date JJ/MM/AAAA
                    if(resp.items[i].start.dateTime != undefined) var date_event = resp.items[i].start.dateTime;
                    else var date_event = resp.items[i].start.date;
                    date_event_tab = date_event.split('-');
                    date_event_tab[2] = date_event_tab[2].split('T');
                    date_event = date_event_tab[2][0]+" / "+date_event_tab[1];

                    var summary_event = resp.items[i].summary;

                    if(document.getElementById("#"+date_event_tab[2][0])) {
                      $("<p>"+date_event+"<br/><b>"+summary_event+"</b></p>").appendTo("#"+date_event_tab[2][0]);
                    } else {
                      $("<div class='jour_calendar' id='"+date_event_tab[2][0]+"'><p>"+date_event+"<br/><b>"+summary_event+"</b></p></div>").appendTo('#events');
                    }
                  }
                } else {
                  var erreur = document.createElement('p');
                  erreur.innerHTML = "Aucun évènement trouvé.";
                  document.getElementById('events').appendChild(erreur);
                }
                $("<a class='jour_calendar' id='ajouter_event' href='#'><div><p>+</p></div></a>").appendTo('#events');
              });
            }

            function create_new_event(id, nom, date) {
              var request_event_insert = gapi.client.calendar.events.insert({
                
                "calendarId": id,
                "resource" :{
                  "end":{
                    "date": date
                  },
                  "start":{
                    "date": date
                  },
                  "summary": nom
                }
              });
              request_event_insert.execute();
            }

            // AUTRES A PLACER ICI

            // Evenements on Click formulaires/popup
            $("#events").on('click', "#ajouter_event", function(e){
              e.preventDefault();
              $("#popup_ajout_event").fadeIn("slow");
              $("#fond_noir_popup").fadeIn("slow");
              $("#nom_event").val('');
              $("#date_event").val('');
            });

            $("#fermer_popup").on('click', function(e){
              e.preventDefault();
              $("#popup_ajout_event").fadeOut("slow");
              $("#fond_noir_popup").fadeOut("slow");
            });

            $("#fond_noir_popup").on('click', function(e){
              e.preventDefault();
              $("#popup_ajout_event").fadeOut("slow");
              $("#fond_noir_popup").fadeOut("slow");
            });

            $("#envoi_ajout_event").on('click', function(e){
              e.preventDefault();
              var nom = $("#nom_event").val();
              var date = $("#date_event").val();

              create_new_event(calendrier_uandme_id, nom, date);
            });

          });
        }
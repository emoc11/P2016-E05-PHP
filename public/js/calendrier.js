function ValidDate(dateString)
{
  if(!/^\d{4}\-\d{2}\-\d{2}$/.test(dateString)) return false;
  var parts = dateString.split("-");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);
  if(year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;
  var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;
  return day > 0 && day <= monthLength[month - 1];
};

var clientId = '1094307263361-6q6u8m0ljv8fdor650pji75a7m5sjbfh.apps.googleusercontent.com';
//var apiKey = 'AIzaSyBHpfRmJmv5R9eS93EiIhcbz1fBy2Ix8q0';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
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
        'orderBy': 'startTime',
        'singleEvents': true,
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
            date_event = date_event_tab[2][0]+" / "+date_event_tab[1]+" / "+date_event_tab[0];

            var summary_event = resp.items[i].summary;

            if($("#"+date_event_tab[2][0]+date_event_tab[0]).length == 0) {
              $("<div class='jour_calendar' id='"+date_event_tab[2][0]+date_event_tab[0]+"'><p>"+date_event+"<br/><ul><li><a href='#' class='lien_infos_event' data-id='"+resp.items[i].id+"'>"+summary_event+"</a></li></ul></p></div>").appendTo('#events');
            } else {
              $("<li><a href='#' class='lien_infos_event' data-id='"+resp.items[i].id+"'>"+summary_event+"</a></li>").appendTo("#"+date_event_tab[2][0]+date_event_tab[0]+" ul");
            }
          }
        } else {
          var erreur = document.createElement('p');
          erreur.innerHTML = "Aucun évènement trouvé.";
          document.getElementById('events').appendChild(erreur);
        }
      });
    }

    // Création d'un nouvel event --------------------
    function create_new_event(id, nom, date, desc, loc) {
      var request_event_insert = gapi.client.calendar.events.insert({
        "calendarId": id,
        "resource" :{
          "end":{
            "date": date
          },
          "start":{
            "date": date
          },
          "summary": nom,
          "description": desc,
          "location": loc,
        }
      });
      request_event_insert.execute(function() {
        setTimeout(function(){location.reload();},100);
      });
    }

    // Affichage des infos d'un event --------------------
    function infos_event(calendar_id, event_id) {
      var titre = "";
      var date = "";
      var lieu = "";
      var desc = "";
      var request_event_infos = gapi.client.calendar.events.get({
        "calendarId": calendar_id,
        "eventId": event_id
      });
      request_event_infos.execute(function(resp) {
        console.log(resp);
        // Affichage correct de la date JJ/MM/AAAA
        if(resp.start.dateTime != undefined) var date_event = resp.start.dateTime;
        else var date_event = resp.start.date;
        date_event_tab = date_event.split('-');
        date_event_tab[2] = date_event_tab[2].split('T');
        date_event = date_event_tab[2][0]+" / "+date_event_tab[1]+" / "+date_event_tab[0];

        titre = resp.summary;
        date = date_event;
        lieu = resp.location;
        desc = resp.description;
        id = resp.id;

        // Informations placées, puis affichage de la div remmplie + fond noir
        $("<h1>"+titre+"</h1>").appendTo('#infos_event');
        $("<p id='info_date_event'>"+date+"</p>").appendTo('#infos_event');
        if(lieu != undefined) $("<p id='info_lieu_event'>Lieu<br/>"+lieu+"</p>").appendTo('#infos_event');
        if(desc != undefined) $("<p id='info_desc_event'>Description<br/>"+desc+"</p>").appendTo('#infos_event');
        $("#info_suppr_popup").attr("data-id", id);
        $("#info_modif_popup").attr("data-id", id);
        $("#popup_info_event").fadeIn("slow");
        $("#fond_noir_popup").fadeIn("slow");
      });
    }

    function supprime_event(calendar_id, event_id){
      var request_event_suppr = gapi.client.calendar.events.delete({
        "calendarId": calendar_id,
        "eventId": event_id
      });
      request_event_suppr.execute(function() {
        setTimeout(function(){location.reload();},100);
      });
    }

    function modifier_event(calendar_id, event_id, date, nom, desc, loc){
      var request_event_modif = gapi.client.calendar.events.update({
        "calendarId": calendar_id,
        "eventId": event_id,
        "resource" :{
          "end":{
            "date": date
          },
          "start":{
            "date": date
          },
          "summary": nom,
          "description": desc,
          "location": loc,
        }
      });
      request_event_modif.execute(function() {
        setTimeout(function(){location.reload();},100);
      });
    }

    // EVENEMENTS ------------------

    // Evenement Formulaires ajout d'event --------------------
    $("#calendrier").on('click', "#ajouter_event", function(e){
      e.preventDefault();
      $("#popup_ajout_event").fadeIn("slow");
      $("#fond_noir_popup").fadeIn("slow");
      $("#nom_event").val('');
      $("#date_event").val('');
      $("#erreur_ajout_event").html('');

      // Fermeture de la popup au clic sur "fermer"
      $("#ajout_popup_close").on('click', function(e){
        e.preventDefault();
        $("#popup_ajout_event").fadeOut("slow");
        $("#fond_noir_popup").fadeOut("slow");
      });

      // Fermeture de la popup si clic sur fond noir
      $("#fond_noir_popup").on('click', function(e){
        e.preventDefault();
        $("#popup_ajout_event").fadeOut("slow");
        $("#fond_noir_popup").fadeOut("slow");
      });
    });

    // Evenement ouverture popups d'infos d'event --------------------
    $('#events').on('click', ".lien_infos_event", function(e){
      e.preventDefault();
      var event_id = $(this).data('id');
      infos_event(calendrier_uandme_id, event_id);

      // Fermeture de la popup au clic sur "fermer"
      $("#info_popup_close").on('click', function(e){
        e.preventDefault();
        $("#popup_info_event").fadeOut("slow", function() {
          $('#infos_event').empty();
          $('#infos_event').empty();
          $('#infos_event').empty();
          $('#infos_event').empty();
        });
        $("#fond_noir_popup").fadeOut("slow");
      });

      // Fermeture de la popup si clic sur fond noir
      $("#fond_noir_popup").on('click', function(e){
        e.preventDefault();
        $("#popup_info_event").fadeOut("slow", function() {
          $('#infos_event').empty();
          $('#infos_event').empty();
          $('#infos_event').empty();
          $('#infos_event').empty();
        });
        $("#fond_noir_popup").fadeOut("slow");
      });

      // Suppression de l'event si clic sur le bouton correspondent
      $("#info_suppr_popup").on('click', function(e){
        e.preventDefault();
        supprime_event(calendrier_uandme_id, event_id)
      });
    })

    // Verif et transmission des données du form d'ajout d'event vers calendar API --------------------
    $("#envoi_ajout_event").on('click', function(e){
      e.preventDefault();
      var nom = $("#nom_event").val();
      var date = $("#date_event").val();
      var desc = $("#desc_event").val();
      var loc = $("#loc_event").val();
      var date_verif = ValidDate(date);
      var erreur_ajout_event = "";

      if(nom != "" && date != "" && date_verif){
        $("#erreur_ajout_event").html("Évènement ajouté. Actualisation...");
        create_new_event(calendrier_uandme_id, nom, date, desc, loc);
      }
      else {
        if(nom == "") erreur_ajout_event += "Erreur: veuillez préciser un nom.<br/>";
        if(date == "" || !date_verif) erreur_ajout_event += "Erreur: veuillez indiquer une date au format AAAA-MM-JJ.<br/>";
      }
      $("#erreur_ajout_event").html(erreur_ajout_event);
    });

  });
}

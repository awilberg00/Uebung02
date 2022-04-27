"use strict"

/**
 * Berechnet die Distanz zwischen zwei Punkten 
 * @param {number} lat1
 * @param {number} lng1 
 * @param {number} lat2 
 * @param {number} lng2 
 * @returns {number}
 */
function distanzrechner(lat1, lng1, lat2, lng2) {
   const R = 6371e3; // Erdradius 
   const breite1 = lat1 * Math.PI/180; // Umrechnung von Winkel- in Bogenmaß
   const breite2 = lat2 * Math.PI/180; 
   const dif_breite = (lat2-lat1) * Math.PI/180;
   const dif_laenge = (lng2-lng1) * Math.PI/180;
   const a = Math.sin(dif_breite/2) * Math.sin(dif_breite/2) +
             Math.cos(breite1) * Math.cos(breite2) *
             Math.sin(dif_laenge/2) * Math.sin(dif_laenge/2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   const d = R * c; // Ergebnis in Metern 
   return d
}
/**
 * 
 * @returns 
 */
function sortList() {
  var list, i, switching, b, shouldSwitch; // Variablendeklarationen
  list = document.getElementById("id01");
  switching = true;
  while (switching) { // die while-Schleife wiederholt sich so lange, bis keine Listenelemente mehr vertauscht wurden bzw. switching "false" bleibt
    switching = false;
    b = list.getElementsByTagName("LI"); 
   
    for (i = 0; i < (b.length - 1); i++) {  
     
      shouldSwitch = false; // default: die betrachteten Listenelemente sind in der richtigen Reihenfolge und muessen nicht vertauscht werden 
      if (Number(b[i].innerHTML) > Number(b[i + 1].innerHTML)) { 
        shouldSwitch = true;
        break; // falls zwei Listenelemente nicht in der richtigen Reihenfolge sind, muessen sie vertauscht werden und die Schleife wird verlassen  
      }
    }
    if (shouldSwitch) { 
      b[i].parentNode.insertBefore(b[i + 1], b[i]); // die beiden Listenelemente werden vertauscht 
      switching = true; // anschließend wird die Schleife von vorne durchlaufen 
    }
  }
  return list;
}  

 document.getElementById("id02").innerHTML = "Distance Calculator"; 

 let uploadfield = document.getElementById("uploadfield");
 let uploaddiv = document.getElementById("uploadform");
 let distancesdiv = document.getElementById("distances");

 uploadfield.addEventListener('change', function () {
   if (uploadfield.files.length > 0)
   {
    var reader = new FileReader()
    reader.readAsText(uploadfield.files[0]);
    reader.addEventListener('load', function() {
      var result = JSON.parse(reader.result); 

    uploaddiv.style.display = "none" // Upload-Maske ausblenden 
    distancesdiv.style.display = "block" // Distanzen einblenden 
   
    var string = "" 

    for (let index = 0; index < poi.features.length; index++) {
      var d = distanzrechner(poi.features[index].geometry.coordinates[0],poi.features[index].geometry.coordinates[1],result.geometry.coordinates[0],result.geometry.coordinates[1]) // das Ergebnis der Funktion wird in der Variable d gespeichert  
      string += "<li>"
      string += poi.features[index].properties.name // POIS-Name 
      string += ": "
      string += d // string wird nach jedem Schleifendurchgang mit dem Ergebnis erweitert  
      string += "</li>"
   }
   document.getElementById("id01").innerHTML = string
    })
   }
 })

 var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}


function connect() {
    var searchTerm = document.getElementById("searchBox").value.trim();
    var url = "https://restcountries.com/v3.1/name/" + searchTerm;
  
    fetch(url)
  .then(res => res.json())
  .then(data => showInBrowser(data));
  }
  
  function showInBrowser(data) {
    var display = document.getElementById("displayArea");
    display.textContent = "";
  
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.classList.add("countryCard");
  
      var currencies = "N/A";
      if (data[i].currencies) {
        var currencyArray = [];
        for (var key in data[i].currencies) {
          if (data[i].currencies.hasOwnProperty(key)) {
            var c = data[i].currencies[key];
            currencyArray.push(c.name + " (" + c.symbol + ")");
          }
        }
        currencies = currencyArray.join(", ");
      }
  
      var timezones = data[i].timezones ? data[i].timezones.join(", ") : "N/A";
  
      div.innerHTML = 
        "Country: " + data[i].name.common + "<br>" +
        "Capital: " + (data[i].capital ? data[i].capital[0] : "N/A") + "<br>" +
        "Region: " + data[i].region + "<br>" +
        "Population: " + data[i].population.toLocaleString() + "<br>" +
        "Currency: " + currencies + "<br>" +
        "Timezone: " + timezones + "<br>" +
        "Flag:<br><img src='" + data[i].flags.png + "'><br><br>";
  
      display.appendChild(div);
    }
  }
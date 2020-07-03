import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { ExchangeService } from './../src/exchange-service.js';

function convertDollars(input, conversionRates) {
  let convertedDollars = [];
  for (let i = 0; i < conversionRates.length; i ++) {
    convertedDollars.push((input * conversionRates[i][0]).toFixed(2));
  }
  return convertedDollars;
}

$(document).ready(function() {
  $("#to-convert").submit(function(e) {
    (e).preventDefault();
    let dollars = $("#dollars").val();
    let toConvert = [];
    let exchangeAmounts;

    $("input:checkbox[class=currency]:checked").each(function() {
      let currency = $(this).val();
      (toConvert).push(currency);
    });

    (async () => {
      let exchangeService = new ExchangeService();
      const response = await exchangeService.getExchangeRates();
      getElements(response);
    })();

    function getElements(response) {
      if (response) {
        let exchangeValues = [[response.conversion_rates.BGN, "BGN", "лв"], [response.conversion_rates.HUF, "HUF", "Ft"], [response.conversion_rates.KZT, "KZT", "₸"], [response.conversion_rates.PLN, "PLN", "zł"], [response.conversion_rates.RUB, "RUB", "₽"]];
        let exchangeArray = [];

        for (let i = 0; i < 5; i ++) {
          for (let j = 0; j < toConvert.length; j ++) {
            if (toConvert[j] === exchangeValues[i][1]) {
              exchangeArray.push(exchangeValues[i]);
            }
          }
        }
      

        exchangeAmounts = convertDollars(dollars, exchangeArray);
        for (let i = 0; i < exchangeArray.length; i ++) {
          if () { 
            $("span#" + exchangeValues[i][1]).text(exchangeValues[i][3] + exchangeAmounts[i]);
          }
        }
      } else {
        $("#results").html(`There was an error handling your request.`);
      }
    }
  });
});
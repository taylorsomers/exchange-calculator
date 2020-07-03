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

// function unknownCurrency(array1, array2) {
//   for (let i = 0; i < array1.length; i ++) {
//     for (let j = 0; j < array2.length; i ++) {
//       if array1[i][1].every
//     if (!array2[j].includes(array1[i])) {
//       ("#results").html("<p>It looks like you either selected a currency our exchange rate calculator does not support or you did not select any available currencies to convert.</p>");
//     }
//   }
// }

$(document).ready(function() {
  $("#to-convert").submit(function(e) {
    (e).preventDefault();

    let dollars = $("#dollars").val();
    let toConvert = [];

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

        unknownCurrency(toConvert, exchangeValues);

        for (let i = 0; i < 5; i ++) {
          for (let j = 0; j < toConvert.length; j ++) {
            if (toConvert[j] === exchangeValues[i][1]) {
              exchangeArray.push(exchangeValues[i]);
            }
          }
        }

        let exchangeAmounts = convertDollars(dollars, exchangeArray);
        $("#output").html("<ul id='results'></ul>");
        for (let i = 0; i < exchangeAmounts.length; i ++) {
          $("#results").append("<li>" + exchangeArray[i][2] + exchangeAmounts[i] + "</li>");
        }
      } else {
        $("#results").html(`There was an error handling your request.`);
      }
    }
  });
});
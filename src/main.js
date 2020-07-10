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

function unknownCurrency(array) {
  const currencyList = ["BGN", "HUF", "KZT", "PLN", "RUB"];
  for (let i = 0; i < array.length; i ++) {
    if (!currencyList.includes(array[i])) {
      ("#results").html("<p>It looks like you either selected a currency our exchange rate calculator does not support or you did not select any available currencies to convert.</p>");
    }
  }
}

$(document).ready(function() {
  $("#to-convert").submit(function(e) {
    (e).preventDefault();

    let dollars = $("#dollars").val();
    let toConvert = [];

    // This generates the array of specific currencies into which the user wants to convert their inputted U.S. dollar amount.
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

        // This is a test for whether inputted currencies are not supported by the API; it is technically not possible for this type of error to occur, since the program only allows users to request exchange info on currencies supported by the API.
        unknownCurrency(toConvert); 

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
        $("#ouput").html(`There was an error handling your request. Either the currency exchange API did not respond or the currency exchange server does not include the queried information.`);
      }
    }
  });
});
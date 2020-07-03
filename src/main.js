import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { ExchangeService } from './../src/exchange-service.js';

// function convertDollars(input, conversionRates) {
//   let convertedDollars = [];
//   conversionRates.map(function() {
//     convertedDollars.push(input * );
//   });
//   return convertedDollars;
// }

function convertDollars(input, conversionRates) {
  let convertedDollars = [];
  for (let i = 0; i < 5; i ++) {
    convertedDollars.push((input * conversionRates[i]).toFixed(2));
  }
  return convertedDollars;
}

$(document).ready(function() {
  $("#convert").click(function(e) {
    (e).preventDefault();
    let dollars = $("#dollars").val();
    const exchangeArray = [];
    let exchangeAmounts;

    (async () => {
      let exchangeService = new ExchangeService();
      const response = await exchangeService.getExchangeRates();
      getElements(response);
    })();

    function getElements(response) {
      if (response) {
        let exchangeValues = [response.conversion_rates.BGN, response.conversion_rates.HUF, response.conversion_rates.KZT, response.conversion_rates.PLN, response.conversion_rates.RUB];
        let isoSymbols = ["BGN", "HUF", "KZT", "PLN", "RUB"];
        exchangeValues.map((element) => {
          exchangeArray.push(element);
        });
        exchangeAmounts = convertDollars(dollars, exchangeArray);
        for (let i = 0; i < 5; i ++) {
          $("span#" + isoSymbols[i]).text(exchangeAmounts[i]);
        }
      } else {
        $("#results").html(`There was an error handling your request.`);
      }
    }

  });
});
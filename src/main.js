import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import { ExchangeService } from './../src/exchange-service.js';

$(document).ready(function() {
  $("#convert").click(function(e) {
    (e).preventDefault();
    let dollars = $("#dollars").val();
    const exchangeArray = [];

    (async () => {
      let exchangeService = new ExchangeService();
      const response = await exchangeService.getExchangeRates();
      getElements(response);
    })();

    function getElements(response) {
      if (response) {
        let exchangeValues = response.conversion_rates.AED;
      } else {
        $("#results").html(`There was an error handling your request.`);
      }
    }
  });
});
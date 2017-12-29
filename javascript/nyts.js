$(document).ready(function(){
// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=66ba1be6b240474fa12484d4dc210b02&q=dc;

// Break API endpoint into components to be defined by variables

var apiKey = 'api-key=' + '66ba1be6b240474fa12484d4dc210b02';
var searchTerm;
var beginYear = 1000;
var endYear = 2017;
var numResults;






// display Results


$("#run-search").on("click", function(event) {
  event.preventDefault();

// Capture user entered values and store in variables for each component
    searchTerm = $('#search-term').val().trim();
    var term = '&q=' + searchTerm;
    console.log('term',term);
    numResults = $('#num-records-select').val();
    console.log('numResults',numResults);
    var userBegin = $('#start-year').val().trim();
    if (userBegin > 999){
       beginYear = userBegin;
    }
    var beginDate = '&begin_date=' + beginYear + '0101';
    console.log('beginDate',beginDate);
    var userEnd = $('#end-year').val().trim();
    if (userEnd >999) {
      endYear = userEnd;
    }
    var endDate = '&end_date=' + endYear + '1231';
    console.log('endDate',endDate);

// make api call with user endpoint constructed based on user inputs
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + apiKey + term + beginDate + endDate;
console.log('url',url);
    $.ajax({
    url: url,
    method: 'GET',
    }).done(function(result) {

    $('#well-section').empty();
    for (var i = 0; i < numResults; i++) {
      var article = $('<div>', {'class': 'article', 'text': result.response.docs[i].headline.main});
      $('#well-section').append(article);

    };
    }).fail(function(err) {
    throw err;
    });

});

$("#clear-all").on("click", function() {
  $('#well-section').empty();
  $('#search-term').val('');
  $('#num-records-select').val(5);
  $('#start-year').val('');
  beginYear = 1000;
  $('#end-year').val('');
  endYear = 2017;



  });


  });

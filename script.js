'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
  $('#results-list').append(
    `<li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}" target="_blank" rel="noreferrer noopener">${responseJson[i].url}</a>
        <p>Description${responseJson[i].description}</p>
     </li>`
  )};
  $('.errorMsg-js').hide();
  $('#results').removeClass('hidden');
}

function getUserRepos(username) {
  console.log('initiating user repo search');
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
      if(response.ok){
        return response.json()
      } 
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#results-list').empty();
      $('#results').addClass('hidden');
      $('.errorMsg-js').show();
      $('.errorMsg-js').text(`Oops! Something went wrong: ${error.message}. Try again.`)
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const nameSearch = $('#js-search-term').val();
    getUserRepos(nameSearch);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm()
});
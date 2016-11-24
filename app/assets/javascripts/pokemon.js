// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function(pokemonUri){
  this.id = PokemonApp.idFromUri(pokemonUri);
};
PokemonApp.Pokemon.prototype.render= function () {
  console.log("Rendering pokemon: #" + this.id);
};
PokemonApp.idFromUri = function(pokemonUri){
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
}

$(document).on("ready",function(){
  $(".js-show-pokemon").on("click",function(event){
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });
  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function(response){
      console.log("Pokemon info:");
      console.log(response);
      $('.js-pkmn-name').text(response.name);
      $('.js-pkmn-number').text(response.pkdx_id);
      $('.js-pkmn-height').text(response.height);
      $('.js-pkmn-weight').text(response.weight);
      $('.js-pokemon-modal').modal("show");
    }
  });
});

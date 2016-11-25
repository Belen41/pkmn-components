// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
PokemonApp.Pokemon = function(pokemonUri){
  this.id = PokemonApp.idFromUri(pokemonUri);
};

PokemonApp.PokemonEvolutions= function(evolutionuri,pokeoriginal){
  this.id = PokemonApp.idFromUri(evolutionuri);
  this.original = pokeoriginal;
};

PokemonApp.idFromUri = function(pokemonUri){
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

PokemonApp.Pokemon.prototype.render= function () {
  console.log("Rendering pokemon: #" + this.id);
  var idPokemon = parseInt(this.id) + 1;  // el ultimo parámetro de la uri de la imagen del pokemon es igual a su id +1.
  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function(response){
      console.log("Pokemon info:");
      console.log(response);
      $('.js-pkmn-name').text(response.name);
      $('.js-pkmn-number').text(response.pkdx_id);
      $('.js-pkmn- height').text(response.height);
      $('.js-pkmn-weight').text(response.weight);
      $('.js-pkmn-hp').text(response.hp);
      $('.js-pkmn-attack').text(response.attack);
      $('.js-pkmn-defense').text(response.defense);
      $('.js-pkmn-sp-attack').text(response.sp_atk);
      $('.js-pkmn-sp-defense').text(response.sp_def);
      $('.js-pkmn-speed').text(response.speed);
      $('.js-pkmn-exp').text(response.exp);
      $('.js-pkmn-sprites')
      var evolutions= response.evolutions;
      // $('.js-show-evolutions').empty();
      console.log(evolutions.length);
      if(evolutions.length === 0){
        $('.js-show-evolutions').text("No Evolutions");
      }else{
        $('.js-show-evolutions').text("Show Evolutions");
        console.log(evolutions[0].resource_uri);
        $('.js-show-evolutions').attr('data-evolution-uri',evolutions[0].resource_uri);
      }
      var types=response.types;
      $('.js-pkmn-types').empty();
      for(var i=0; i<types.length; i++){
          $('.js-pkmn-types').append(`<dd>${types[i].name}</dd>`).text()
      };
      $.ajax({
        url: "https://pokeapi.co/api/v1/sprite/" + idPokemon,
        success: function(response){
        console.log("Pokemon Image");
        console.log(response);
        if(response.image.length != 0){
          var uriArray= response.image.split('/')
          var imgUrl= uriArray[uriArray.length-1].split('.')[0];
          debugger
        }else{
          "not available"
        };
        $('.js-show-image').attr('src','https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+imgUrl);
        }
      });
      $('.js-pokemon-modal').modal("show");
    }
  });
};

PokemonApp.PokemonEvolutions.prototype.render= function(){
  console.log("Rendering pokemon evolutions: #" + this.id + " from: " + this.original);
  $.ajax({
    url: "api/pokemon/" + this.id,
    success: function(response){
      console.log("Evolutions info");
      console.log(response);
      $('.js-pkmn-evol-name').text(response.name);
      $('.js-pkmn-evol-number').text(response.pkdx_id);
      $('.js-pkmn-evol-height').text(response.height);
      $('.js-pkmn-evol-weight').text(response.weight);
      $('.js-pkmn-evol-hp').text(response.hp);
      $('.js-pkmn-evol-attack').text(response.attack);
      $('.js-pkmn-evol-defense').text(response.defense);
      $('.js-pkmn-evol-speed').text(response.speed);
      $('.js-pkmn-evol-exp').text(response.exp);
      $('.js-evolutions-modal').modal("show");
    }
  });
}
$(document).on("ready",function(){
  $(".js-show-pokemon").on("click",function(event){
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });
  $(".js-show-evolutions").on("click", function(event){
    $('.js-pokemon-modal').modal('toggle');
    var $button= $(event.currentTarget);
    var evolutionUri=$button.data("evolution-uri");
    var pokemonEvolutions= new PokemonApp.PokemonEvolutions(evolutionUri,$('.js-pkmn-name').text());
    pokemonEvolutions.render();
  });
});

/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var selected;
var selected_before;
var pares = false;
var lista_selecionados = [];
var lista_card;
var lista_encontrados = [];

$('li').each(function(){
		
		$(this).click(function(){
			selected = $(this);
			var nomeCLass = selected.children().attr('class');
			lista_selecionados.push(nomeCLass);
			console.log("Selecionados: "+lista_selecionados);
			console.log("Encontrados: "+lista_encontrados);
			console.log("Está na lista: "+isOnTheList(nomeCLass));
			
			if(lista_selecionados.length == 1){
				if((isOnTheList(nomeCLass))){

				}else{
					selected.css('background','red');
					managerClassInHTML(selected, "open show", 1);
				}

			}

			if(lista_selecionados.length == 2){
				if(isOnTheList(nomeCLass)){

				}else{

					if(lista_selecionados[0] === lista_selecionados[1]){
						selected.css('background','#02ccba');
						managerClassInHTML(selected, "open show", 1);
						selected_before.css('background','#02ccba');
						addClasstToListFound(selected.children().attr('class'));
						addClasstToListFound(selected_before.children().attr('class'));
						pares = true;
					}else{
						pares = false;
						selected.css('background','#2e3d49');
						selected_before.css('background','#2e3d49');
						managerClassInHTML(selected_before, "open show", 0);
					}
				}
			}

			if(lista_selecionados.length == 2){
				if(pares){
					lista_selecionados.splice(0,2);
				}else{
					lista_selecionados.splice(0,2);
					selected.css('background','#2e3d49');
				}

			}

			selected_before = $(this);		
		});

	});


function isOnTheList(objetoClicado){
	if(lista_encontrados.indexOf(objetoClicado) == -1){
		return false;
	}else{
		return true;
	}
}

function addClasstToListFound(objetoEncontrado){
	lista_encontrados.push(objetoEncontrado);
}

function getList(){
	lista_card = $('li');
	return lista_card;
}

function randomCards(){
	var list_random;
	list_random = shuffle(getList());

}

function managerClassInHTML(card, nameOfClass, addOrRemove){
	if(addOrRemove == 1){
	card.addClass(nameOfClass);		
	}
	if(addOrRemove == 0){
		card.removeClass(nameOfClass);
	}
}



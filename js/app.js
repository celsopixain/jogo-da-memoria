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
var nomeCLassFirst;
var nomeCLassSecund;
var erros = 3;
var stars = [];




stars = $('.stars li').children();
$('ul.deck li').each(function(){
		$(this).click(function(index, value){
			

			if(erros > 0 ){	
			//Seleciona a carta com elemento this do each
			selected = $(this);
			console.log(stars);

			//busca o nome da class do filho do elemento card
			nomeCLassFirst = selected.children().attr('class');

			//Adiciona o nome do elemento em uma lista de itens selecionados
			lista_selecionados.push(nomeCLassFirst);

			//Adiciona Efeitos de seleção da carta 
			
			selected.animate({
			transform:"rotateY(180deg)",
			perspective:100
			, height:"100px"},150);

			selected.animate({
			transform:"rotateY(90deg)",
			perspective:100},150);
			
			selected.animate({
			transform:"none",
			perspective:100,
			height:"125px"},150);

			selected.css("pointer-events","none");
			// selected.css("pointer-events", "auto");
		if(!isOnTheList(nomeCLassFirst)){

			//Se a seleção for apenas de uma carta então não faz nada
			if(lista_selecionados.length <= 1){
			//console.log(lista_encontrados);
				
				/*Se existe a classe na lista então não faz nada, impedindo até de mudar a cor da carta
				 pois já consta selecionada */

				
				managerClassInHTML(selected, "open show", 1);
				selected.css('background','#02b3e4');


				selected_before = selected;	
				// Senao exibe o desenho do elemento filho da carta selecionada			

				}	



			/* Agora se for selecionado 2 cartas entao */
			if(lista_selecionados.length == 2){
			
				
				
				if(isOnTheList(nomeCLassFirst)){

				}else{
					managerClassInHTML(selected, "open show", 1);
					selected.css('background','#02b3e4');
					
					if(lista_selecionados[0] === lista_selecionados[1]){
						areTheSame();
					}else{

						turnOffEfect();
						setTimeout(notAreTheSame(),1000);
						erros = erros-1;
						$('.moves').text(erros);

						
						$('.stars li i').each(function(){
							if($(this).attr('class') === "fa fa-star"){
								managerClassInHTML($(this),"fa-star",0);
								return false;	
							}

						})

						
					}
				}
			}

			if(lista_selecionados.length == 2){
				if(isOnTheList(nomeCLassFirst)){

				}else{

					if(pares){
						lista_selecionados.splice(0,2);
					}else{
						lista_selecionados.splice(0,2);
						selected.css('background','#2e3d49');
						selected_before.css('background','#2e3d49');
					}
				}		

			}

			selected_before = $(this);
			nomeCLassSecund = $(this).children().attr('class');
		}else{
			notAreTheSame();
			
			setTimeout(function(){managerClassInHTML(selected_before, "open show", 0);
			selected_before.css('background','#2e3d49');
			},600);
			}
			selected.css("pointer-events", "auto");
		}else{

			embaralhar();
			alert("Erros = 3");
		}		
	});
	
	

});

function turnOnEfect() {
	
	setTimeout(function(){managerClassInHTML(selected_before, "open show", 1);
	selected_before.css('background','#02b3e4');
	},400)
}

function turnOffEfect(){
	
	setTimeout(function(){managerClassInHTML(selected, "open show", 0);
	selected.css('background','#2e3d49');
	},600);
	
	managerClassInHTML(selected_before, "open show", 0);
	selected_before.css('background','#2e3d49');
}
	
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

function areTheSame(){
	selected.css('background','#02ccba');
	managerClassInHTML(selected, "open show", 1);
	selected_before.css('background','#02ccba');
	addClasstToListFound(selected.children().attr('class'));
	pares = true;
	lista_selecionados.splice(0,2);
}

function notAreTheSame(){
	pares = false;
	lista_selecionados.splice(0,2);

}
	
function efectClickedAnimate(objetoSelecionado, cssEscolhido, valorCss, tempo){
	objetoSelecionado.animate({cssEscolhido:'"'+valorCss+'"'},tempo);
}

function embaralhar(){

	var list = [];
	$('.deck i').each(function(){
		list.push($(this).attr('class'));
	})

	list = shuffle(list);	
	
	$('.deck i').each(function(index){

		console.log($(this).attr('class'));
		$(this).removeClass();
		$(this).addClass(list[index]);

	})
	novoJogo();	

}

function novoJogo(){
	
	selected = null;
	selected_before = null;
	pares = false;
	lista_selecionados = [];
	lista_card  = [];
	lista_encontrados = [];
	nomeCLassFirst = null;
	nomeCLassSecund = null
	erros = 3;
	$('.moves').text(erros);

	
	$('ul.deck li').each(function(){
		$('ul.deck li').css('background','#2e3d49');

		if($('ul.deck li').hasClass('open show')){
			managerClassInHTML($('ul.deck li'),'open show',0);

		}		

	})

	$('.stars li i').each(function(){
		if($(this) != null){
			managerClassInHTML($(this),"fa-star",1);
					
		}

	})

}

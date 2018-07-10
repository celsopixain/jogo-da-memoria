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



$('li').each(function(){
		
		$(this).click(function(){

			//Seleciona a carta com elemento this do each
			selected = $(this);

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
			transform:"none",
			perspective:100,
			height:"125px"},150);
			console.log(lista_encontrados);
		
			//Se a seleção for apenas de uma carta então não faz nada
			if(lista_selecionados.length <= 1){
			//console.log(lista_encontrados);
				
				if(isOnTheList(nomeCLassFirst)){
				/*Se existe a classe na lista então não faz nada, impedindo até de mudar a cor da carta
				 pois já consta selecionada */

				}else{
				managerClassInHTML(selected, "open show", 1);
				selected.css('background','red');

				selected_before = selected;	
				// Senao exibe o desenho do elemento filho da carta selecionada			

					//setTimeout(function(){managerClassInHTML(selected, "open show", 1);
					//selected.css('background','red');},400)

				}

			}

			/* Agora se for selecionado 2 cartas entao */
			if(lista_selecionados.length == 2){
			
				
				
				if(isOnTheList(nomeCLassFirst)){

				}else{
					managerClassInHTML(selected, "open show", 1);
					selected.css('background','red');
					
					if(lista_selecionados[0] === lista_selecionados[1]){
						areTheSame();
					}else{

						console.log('selected: '+selected.children().attr('class'));
						console.log('selected_before: '+selected_before.children().attr('class'));
						turnOffEfect();
						setTimeout(notAreTheSame(),1000);
						
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
		});

	});

function turnOnEfect() {
	
	setTimeout(function(){managerClassInHTML(selected_before, "open show", 1);
	selected_before.css('background','red');
	},400)
}

function turnOffEfect(){
	
	setTimeout(function(){managerClassInHTML(selected, "open show", 0);
	selected.css('background','#2e3d49');
	},600);
	
	managerClassInHTML(selected_before, "open show", 0);
	selected_before.css('background','#2e3d49');
	console.log('selected_before pai: '+selected_before.attr('class'));
	console.log('selected_before filho: '+selected_before.children().attr('class'));
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
	//selected.css('background','#2e3d49');
	//selected_before.css('background','#2e3d49');
	//managerClassInHTML(selected, "open show", 0);
	//managerClassInHTML(selected_before, "open show", 0);
	lista_selecionados.splice(0,2);

}
	
function efectClickedAnimate(objetoSelecionado, cssEscolhido, valorCss, tempo){
	// console.log('obj: '+objetoSelecionado+ cssEscolhido+": "+valorCss);
	objetoSelecionado.animate({cssEscolhido:'"'+valorCss+'"'},tempo);
	console.log(objetoSelecionado+'.'+'animate'+'('+'{'+cssEscolhido+':'+'"'+valorCss+'"'+'}'+','+tempo+')');
}

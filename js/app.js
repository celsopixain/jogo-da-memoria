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
var erros = 4;
var stars = [];
var wins = 0;
var modal_01 = document.getElementById('id01');
var modal_02 = document.getElementById('id02');
var cores = ["#EE82EE","#A9A9A9","#40E0D0","#FFFF00" ,"#F0E68C","#DC143C","#7FFF00","#F4A460"];
var indice_cor = 0;
var lista_cartas_reais = [];
var vitorias = 0;

window.onclick = function(event) {
  if (event.target == modal_01) {
    modal_01.style.display = "none";
    embaralhar();
  }
  if(event.target == modal_02){
  	modal_02.style.display = "none";
  	embaralhar();
  }
}


stars = $('.stars li').children();

iniciarJogo();

/*window.onload = initPage;
function initPage(){
	embaralhar();
}*/

$('ul.deck li').each(function(index, value){
		$(this).click(function(){
			

			selected = $(this);
			

			nomeCLassFirst = selected.children().attr('class');

			lista_selecionados.push(nomeCLassFirst);

			if(lista_selecionados.length <= 1){
				
				open_or_close_card(true,selected);
				blockCard(selected,true);	

				lista_cartas_reais[0] = $(this);
				selected_before = selected;
				
				}	

			if(lista_selecionados.length == 2){
				blockCard(selected_before,true);	
				blockCard(selected,true);	
				
				lista_cartas_reais[1] = $(this);
				
				if(isOnTheList(nomeCLassFirst)){

				}else{
					open_or_close_card(true,selected);

					if(lista_selecionados[0] === lista_selecionados[1] ){
						efectOnTheCorrectCard(selected_before,false);
						if(cores[indice_cor]!= null){
							areTheSame(cores[indice_cor]);
							indice_cor++;
							blockCard(lista_cartas_reais[0], true);
							blockCard(lista_cartas_reais[1], true);
							lista_cartas_reais = [];
						}

					}else{
						
						lista_cartas_reais = [];
						turnOffEfect();
						setTimeout(function(){ blockCard($('ul.deck li'),true);}, 100);
						if(selected_before != null){
								setTimeout(function(){
									open_or_close_card(false,selected_before);
								},1000);
							}
						blockCard(selected_before,false);
						notAreTheSame();
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

				if(pares){
					lista_selecionados.splice(0,2);
				}else{
					lista_selecionados.splice(0,2);
				}


			}

			nomeCLassSecund = $(this).children().attr('class');
			
	});
	

});

function turnOnEfect() {
	if(selected_before != null){
		setTimeout(function(){managerClassInHTML(selected_before, "open show", 1);
			selected_before.css('background','#02b3e4');},400)
	}
}

function turnOffEfect(){
	
	if(selected != null){

		setTimeout(function(){open_or_close_card(false, selected);
			if(selected != null)selected.css('background','#2e3d49');
		},1000);
	}
	
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
	if(addOrRemove == 1 && card != null){
		card.addClass(nameOfClass);		
	}
	if(addOrRemove == 0 && card != null){
		card.removeClass(nameOfClass);
	}
}

function areTheSame(cor){
	setTimeout(function(){ selected.css('background-color',cor); }, 300);
	selected_before.css('background-color',cor);
	
	setTimeout(function(){ efectOnTheCorrectCard(selected,true); }, 200);
	
	addClasstToListFound(selected.children().attr('class'));
	pares = true;
	lista_selecionados.splice(0,2);
	if(lista_encontrados.length == 8){
		document.getElementById('id02').style.display='block';
		vitorias++;
		$('.qnt_vitorias').text(getVitorias());
	}


}

function notAreTheSame(){
	if(erros <= 1 ){
		document.getElementById('id01').style.display='block';
	}
	pares = false;
	lista_selecionados.splice(0,2);
	setTimeout(function(){
		blockCard(selected,false);
	},1000);
}
	

function embaralhar(){
	$(this).css("pointer-events", "auto");
	var list = [];
	$('.deck i').each(function(){
		list.push($(this).attr('class'));
	})

	list = shuffle(list);	
	
	$('.deck i').each(function(index){

		$(this).removeClass();
		$(this).addClass(list[index]);

	})
	novoJogo();	

}

function novoJogo(){
	
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

	blockCard($('ul.deck li'),false);

	selected = null;
	selected_before = null;
	pares = false;
	lista_selecionados = [];
	lista_card  = [];
	lista_encontrados = [];
	nomeCLassFirst = null;
	nomeCLassSecund = null
	erros = 4;
	indice_cor = 0;
	$('.moves').text(erros);
	iniciarJogo();

}

function open_or_close_card(openORClose, card){
	if(card != null){
		if(openORClose == true){
			setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ card.css('background','#02b3e4'); }, 250);
			setTimeout(function(){ card.addClass('open show'); }, 250);
				
		}else {
			
			
			setTimeout(function(){ card.css('background','#2e3d49'); }, 100);
			setTimeout(function(){ card.removeClass('open show'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(50deg)'); }, 100);
			setTimeout(function(){ card.css('transform','rotateY(100deg)'); }, 150);
			setTimeout(function(){ card.css('transform','rotateY(130deg)'); }, 200);
			setTimeout(function(){ card.css('transform','rotateY(180deg)'); }, 250);
			setTimeout(function(){ blockCard($('ul.deck li'),false);}, 260);
		}
	}
}

function efectOnTheCorrectCard(cartaSelecionada, aux){
	if(aux == true){
		cartaSelecionada.animate({height:"80px"},200);
		cartaSelecionada.animate({height:"125px"},300);
	}else{
		cartaSelecionada.animate({height:"80px"},300);
		cartaSelecionada.animate({height:"125px"},450);
	}
}

function iniciarJogo(){
	blockCard($('ul.deck li'),true);
	open_or_close_card(true,$('ul.deck li'));
	setTimeout(function(){ open_or_close_card(false,$('ul.deck li'));
							blockCard($('ul.deck li'),true);
	 },5000);
	setTimeout(function(){
		blockCard($('ul.deck li'),false);
	},5200);	

}

function blockCard(objetoSelecionado, blockOrDes){
	if(objetoSelecionado != null){
		if(blockOrDes == true){
			objetoSelecionado.css("pointer-events","none");
		}else{
			objetoSelecionado.css("pointer-events","auto");
		}
	}
}

function locksOrUnlocksAll(allOrNothing){
	if(allOrNothing == true){
		blockCard($('ul.deck li'),true);
	}else{
		blockCard($('ul.deck li'),true);
	}
}

function getVitorias(){
	return vitorias;
}
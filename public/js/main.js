var campo = $(".campo-texto");
var tempoInicialSegundos = $("#tempo").text();
var tempoInicialMinutos = tempoInicialSegundos/60;
var botaoTrocaFrase = $("#troca-frase");
var botaoScore = $("#botao-score");
var jogoValido = false;

$(document).ready(function(){
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcador();
});



$("#reiniciar").on("click",reiniciaJogo);
botaoTrocaFrase.click(fraseAleatoria);

function reiniciaJogo(){
    $("#tempo").text(tempoInicialSegundos);
    campo.attr("contenteditable", "true");
    campo.removeClass("jogo-concluido");
    campo.text("");
    campo.css({"border": "3px solid black"});
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");

    inicializaCronometro();
}

function inicializaMarcador(){
    campo.on("input",function(){
        var digitadas = $(".campo-texto").html();
        var palavras = $(".texto").html().substr(0, digitadas.length);

        if(digitadas == palavras){
            $(this).css({
                "border": "3px solid green"
            });
            jogoValido = true;
        }else{
            $(this).css({
                "border": "3px solid red"
            });
            jogoValido = false;
        }
    });
}

function inicializaContadores(){
    campo.on("input",function(){
        var qtdCaracteres = campo.html().length;
        var qtdPalavras = campo.html().trim().split(/\S+/).length - 1 ;
        $("#contador-caracteres").text(qtdCaracteres);
        $("#contador-palavras").text(qtdPalavras);
    });
}


function inicializaCronometro(){
    campo.one("focus",function(){
        var cronometroId = setInterval(function(){
            contaTempo(cronometroId);
        },1000);
    });
}


function contaTempo(cronometroId){
    var segundosRestante = $("#tempo").text();
    if(segundosRestante <= 1){
        campo.attr("contenteditable","false");
        clearInterval(cronometroId);
        $("#tempo").text(segundosRestante - 1);
        finalizaJogo();
    }else{
        $("#tempo").text(segundosRestante - 1);
    }
}

function finalizaJogo(){
    campo.addClass("jogo-concluido");
    var palavrasEscritas = parseInt($("#contador-palavras").text());
    var palavrasPorMinuto = (palavrasEscritas/tempoInicialMinutos).toFixed(2);
    scrollScore();
    var resultado = validaJogo(palavrasPorMinuto);
    $(".score").append(resultado);
}

function validaJogo(palavrasPorMinuto){
    var resultado = "<li>"+ palavrasPorMinuto +"ppm";
    if(jogoValido == true){
        resultado += "<i class='material-icons green-text'>spellcheck</i></li>";
    }else{
        resultado += "<i class='material-icons red-text'>error_outline</i></li>";
    }
    return resultado;
}



function fraseAleatoria(){
    $(".spinner").toggle("spinner");
    $.get({
        url: "http://localhost:3000/frases",
        success: trocaFrase
    }).done(function(){
        $(".spinner").toggle("spinner");
    }).fail(function(){
        $(".erro").slideDown();
        setTimeout(function(){
            $(".spinner").toggle("spinner");
            $(".erro").hide();
        },1000);
    });
}

function trocaFrase(dados){
    var frase = $(".texto");
    var aleatorio = Math.floor(Math.random() * dados.length );
    var novaFrase = dados[aleatorio].texto;
    frase.text(novaFrase);
}

botaoScore.click(scrollScore);
function scrollScore(){
    var score = $(".score").offset().top;
    $('body').animate({scrollTop:score},1000);
}

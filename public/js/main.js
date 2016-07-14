var campo = $(".campo-texto");
var tempoInicialSegundos = $("#tempo").text();
var tempoInicialMinutos = tempoInicialSegundos/60;

$(document).ready(function(){
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcador();
});


$("#reiniciar").on("click",reiniciaJogo);

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
        console.log("Digitadas:" + digitadas + "|length" + digitadas.length );
        console.log("Palavras: "+ palavras + "|lenght" + palavras.length);
        if(digitadas == palavras){
            $(this).css({
                "border": "3px solid green"
            });
        }else{
            $(this).css({
                "border": "3px solid red"
            });
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

    $(".score").append("<li>"+ palavrasPorMinuto +" ppm</li> ");
}

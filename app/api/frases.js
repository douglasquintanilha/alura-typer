var api = {};

var frases = [
	{_id: 1, texto:'Hakuna Matata, é lindo dizer. Hakuna Matata! Sim você vai entender! Os seus problemas,você deve esquecer. Isso é viver, é aprender, Hakuna Matata!' },
	{_id: 2, texto:'Alura, Cursos online de tecnologia que reinventam sua carreira.' },
	{_id: 3, texto:'Caelum, Ensino e Inovação.' }
];

api.lista = function(req, res) {

	var enrola;
	for(var i = 0; i < 150000000; i++){
		enrola +=i;
	}

	res.json(frases);
};

module.exports = api;

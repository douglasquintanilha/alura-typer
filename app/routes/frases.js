module.exports = function(app) {

	var api = app.api.frases;

	// mudando a declaração da rota e adicionando suporte ao verbo POST
	app.route('/frases')
		.get(api.lista);
};

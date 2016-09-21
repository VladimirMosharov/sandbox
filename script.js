app = new AppParams(); 	// Экземпляр приложения
app.load('login');		// Загрузка первого состояния

function AppParams(){
	var globals = {
		states:{// все возможные состояния(страницы) с зависимымостями-модулями
			login: ['login'],
			alert: ['alert'],
			home: ['home']
		},
		user:{// данные пользователя
			id: '',
			login: '',
			name: '',
			level: ''
		},
		loaded: document.getElementsByTagName('head')[0].appendChild(document.createElement('script')),
		messages: {}
	}
	var load_state = function(target){
		get_context = {
			command: 'make_script',
			script_lst: globals.states[target]
		}
		context = new Request(get_context, load_context);
		context.execute();
		function load_context(response){
			document.getElementsByTagName('head')[0].removeChild(globals.loaded);
			globals.loaded = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));
			globals.loaded.innerHTML = response.scriptText;
			startExec();
		}
	}
	return{
		load: function(target){
			load_state(target);
		},
		user: globals.user,
		messages: globals.messages
	}
}
function startExec(){
	page = new startState();
	wait_load('start');
	page.load(app.messages);
}
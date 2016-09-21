// Главная страница проекта, на которую попадают авторизованные пользователи
function startState(){
	app.messages = {}; // обнулить очередь
	var init_data = {
		command: 'request_content',
		tpl_name: 'home_tpl.php'
	}
	var iface = {};
	var req = new Request(init_data, loadTemplate); //запрос нового шаблона
	function loadTemplate(response){
		document.body.innerHTML = response.page_content;
		//-----------------------------------------------//
		iface.name = document.getElementById('user_name');
		iface.login = document.getElementById('user_login');
		iface.id = document.getElementById('user_id');
		iface.level = document.getElementById('user_level');
		iface.btnExit = document.getElementById('btnExit');
		
		iface.name.innerHTML = app.user.name;
		iface.login.innerHTML = app.user.login;
		iface.id.innerHTML = app.user.id;
		iface.level.innerHTML = app.user.level;
		//-----------------------------------------------//
		Listeners.load();
		wait_load('stop');
	}
	var Listeners = {
		load: function(){
			iface.btnExit.addEventListener('click', exitApp);
		},
		unload: function(){
			iface.btnExit.removeEventListener('click', exitApp);
		}
	}
	function exitApp(){
		wait_load('start');
		Listeners.unload();
		app.load('login');
	}
	return{
		load: function(){
			req.execute();
		}
	}
}
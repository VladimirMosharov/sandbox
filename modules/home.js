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
		iface.btnExit = document.getElementById('btnExit');
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
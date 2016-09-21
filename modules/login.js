/*
	Модуль login
	
	Для работы требуется:
		- объект Request
		- файл login_tpl.php на сервере с html-разметкой страницы
			обязательные для разметки параметры:
			<input type="text" id="inp_login">
			<input type="password" id="inp_pass">
			<input type="button" id="btnOk">
	Модуль вешает обработчик нажатий на глобальный объект (выгружается автоматически по окончании работы)
	Если ввод корректный (поля логин/пароь непустые), отправляет серверу пару login/pass
	
	Каждый модуль начинается со startState()
*/

function startState(){
	app.messages = {};
	var init_data = {
		command: 'request_content',
		tpl_name: 'login_tpl.php'
	}
	var iface = {};
	var req = new Request(init_data, loadTemplate);
	function loadTemplate(response){
		document.body.innerHTML = response.page_content;
		//-----------------------------------------------//
		iface.login = document.getElementById('inp_login');
		iface.pass = document.getElementById('inp_pass');
		iface.btnOk = document.getElementById('btnOk');
		//-----------------------------------------------//
		Listeners.load();
		wait_load('stop');
		iface.login.focus();
	}
	var Listeners = {
		load: function(){
			window.addEventListener('keypress', checkKey);
			iface.btnOk.addEventListener('click', validateLoginForm);
		},
		unload: function(){
			window.removeEventListener('keypress', checkKey);
			iface.btnOk.removeEventListener('click', validateLoginForm);
		}
	}
	function checkKey(e){
		if(e.keyCode == 13){
			validateLoginForm();
		}
		else{
			if(iface.login.classList.contains('wrong_input')){
				iface.login.classList.remove('wrong_input');
			}
			if(iface.pass.classList.contains('wrong_input')){
				iface.pass.classList.remove('wrong_input');
			}
		}
	}
	function validateLoginForm(){
		if(iface.login.value.trim() == ''){
			if(iface.login.classList.contains('wrong_input') == false){
				iface.login.classList.add('wrong_input');
			}
			iface.login.focus();
		}
		else if(iface.pass.value.trim() == ''){
			if(iface.pass.classList.contains('wrong_input') == false){
				iface.pass.classList.add('wrong_input');
			}
			iface.pass.focus();
		}
		else{
			param = {
				login: iface.login.value,
				pass: iface.pass.value
			};
			sendLoginData(param);
		}
	}
	function sendLoginData(param){
		wait_load('start');
		Listeners.unload();
		var auth_data = {
			command: 'authentificate',
			auth_pair: param
		}		 
		var auth = new Request(auth_data, checkAuth);
		auth.execute();
		function checkAuth(auth_resp){
			if(auth_resp.result == 'passed'){
				app.user.id = auth_resp.id;
				app.user.login = auth_resp.login;
				app.user.name = auth_resp.name;
				app.user.level = auth_resp.level;
				app.load('home');
			}
			else{
				app.messages.str_to_alert = 'Невозможен вход с указанными учётными данными. Повторите ввод или обратитесь к администратору системы';
				app.messages.caller_name = 'login';
				app.load('alert');
			}
		}
	}
	return{
		load: function(){
			req.execute();
		}
	}
}

// Получает сообщение в app.messages
// Поле str_to_alert - строка, которая выводится пользователю в <div id="alert_msg">
// Поле caller_name - имя представления, вызвавшего alert
// Закрывается по кнопке с  id=btnOk
// Устанавливает глобальный перехватчик Enter(keyCode == 13)
// Передаёт управление представлению из caller_name
function startState(){
	var message = app.messages.str_to_alert;
	var caller_name = app.messages.caller_name;
	app.messages = {}; // обнулить очередь
	var init_data = {
		command: 'request_content',
		tpl_name: 'alert_tpl.php'
	}
	var iface = {};
	var req = new Request(init_data, loadTemplate); //запрос нового шаблона
	function loadTemplate(response){
		document.body.innerHTML = response.page_content;
		document.getElementById('alert_msg').innerHTML = message;
		//-----------------------------------------------//
		iface.btnOk = document.getElementById('btnOk');
		//-----------------------------------------------//
		Listeners.load();
		wait_load('stop');
	}
	var Listeners = {
		load: function(){
			window.addEventListener('keyup', checkKey);
			iface.btnOk.addEventListener('click', readDone);
		},
		unload: function(){
			window.removeEventListener('keyup', checkKey);
			iface.btnOk.removeEventListener('click', readDone);
		}
	}
	function checkKey(e){
		if(e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 32){
			readDone();
		}
	}	
	function readDone(){
		Listeners.unload();
		app.load(caller_name);
	}	
	return{
		load: function(){
			req.execute();
		}
	}
}
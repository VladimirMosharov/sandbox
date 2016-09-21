/* 
Конструктор объекта Request. 
В качестве входных параметров получает приемлемый для JSONификации JS-объект. 
PHP диспетчер (dispatch.php) ожидает наличие признака операции в поле command: объекта.
JSON строка передаётся PHP скрипту через POST-переменную data_block в формате 
"application/x-www-form-urlencoded" и в таком же формате передаётся JSON-ответ
от сервера, содержащий объект данных в формате понятном callback-функции вызывающего скрипта.

На входе - JS-объект.
На выходе - JS-объект.

Подключается в скрипте так:

var myReqData = { // Объект с командой и данными, которые вы хотите отдать на обработку серверу
	command: label_proc,
	data:{
		param1,
		param2,
		param3
	}
}

var somevar = new Request(myReqData, myJSHandler); // Объявление объекта в нашем контексте
somevar.execute(); // Отправка данных запроса

function myJSHandler(response_from_Request){ 	// Колбэк функция, вызываемая Request'ом по готовности
												// с ответом в качестве параметра
	var servData = response_from_Request;
	document.getElementById('titlePage').innerHTML = servData.present.title;
	// ... 
}
*/
function Request(data, callback){
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'core/dispatch.php', true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			callback(JSON.parse(xhr.responseText));
		}
	}
	return{
		execute: function(){
			xhr.send('data_block=' + JSON.stringify(data));
		}
	}
}
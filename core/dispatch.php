<?php
	$recived_data = json_decode($_POST['data_block']);
	$answer = array();
	switch($recived_data->command){
		case 'request_content':
			$answer['page_content'] = file_get_contents('../modules/templates/'.$recived_data->tpl_name);
			break;
		case 'make_script':
			$answer['scriptText'] = '';
			foreach($recived_data->script_lst as $itm){
				$answer['scriptText'] .= file_get_contents('../modules/'.$itm.'.js');
			}
			break;
		case 'authentificate':
			$answer['result'] = 'no_passed';
			$answer['name'] = 'Администратор';
			$answer['login'] = 'admin';
			$answer['id'] = '1';
			$answer['level'] = '0';
			break;
		default:
			//
	}
	header("Content-Type: application/x-www-form-urlencoded");
	echo json_encode($answer);
?>
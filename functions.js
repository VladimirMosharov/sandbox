window.addEventListener('resize', v_centered);
function v_centered(){
	divs = document.getElementsByTagName('div');
	for(var i = 0; i < divs.length; i++){
		if(divs[i].classList.contains('v_center')){
			if (divs[i].offsetHeight < (divs[i].parentNode.offsetHeight - 30)){
				divs[i].style.marginTop = ((divs[i].parentNode.offsetHeight - divs[i].offsetHeight)/2)+'px';
			}			
		}
	}
}
function wait_load(flag){
	if(flag == 'start'){
		if(document.getElementById('wait_block') === null){
			layer1 = document.createElement('div');
			layer1.id = 'wait_block';
			layer1.style.position = 'fixed';
			layer1.style.top = layer1.style.bottom = layer1.style.left = layer1.style.right = '0px';
			layer1.style.background = 'rgba(250, 250, 250, 0.8)';
			
			layer2 = document.createElement('div');
			layer2.style.width = '128px';
			layer2.style.height = '128px';
			layer2.style.margin = 'auto';
			layer2.classList.add('v_center');
			
			picture = document.createElement('img');
			picture.src = 'style/img/wait_w.gif';
			
			picture = layer2.appendChild(picture);
			layer2 = layer1.appendChild(layer2);
			layer1 = document.body.appendChild(layer1);
			v_centered();
		}
	}
	else{
		if(document.getElementById('wait_block') !== null){
			document.body.removeChild(document.getElementById('wait_block'));
		}
	}
}

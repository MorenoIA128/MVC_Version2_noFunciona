function objectAjax(){
	var xmlhttp = false;
	try{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e){
		try{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");			
		} catch (E){
			xmlhttp = false;	
		}		
	}
	if(!xmlhttp && typeof XMLHttpRequest!='undefined'){
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}
//Inicializo automaticamente la funcion read al entrar a la pagina o recargar la pagina;
addEventListener('load', read, false);

function read(){
        $.ajax({        
        		type: 'POST',
                url:   '?c=administrator&m=table_users',               
                beforeSend: function () {
                        $("#information").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#information").html(response);
                }
        });
}

function register(){
	idPedido 		= document.formUser.idPedido.value;
	idCliente 	= document.formUser.idCliente.value;
	fecha 		= document.formUser.fecha.value;
	total 		= document.formUser.total.value;
	metodoDePago 		= document.formUser.metodoDePago.value;
	direccion 		= document.formUser.direccion.value;
	numeroDeSeguimiento 		= document.formUser.numeroDeSeguimiento.value;
	fechaDeEntrega 		= document.formUser.fechaDeEntrega.value;
	idEmpleado 		= document.formUser.idEmpleado.value;
	ajax = objectAjax();
	ajax.open("POST", "?c=administrator&m=registeruser", true);
	ajax.onreadystatechange=function() {
		if(ajax.readyState==4){			
			read();			
			alert('Los datos guardaron correctamente.');			
			$('#addUser').modal('hide');
		}
	}
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
ajax.send("idPedido="+idPedido+"idCliente="+idCliente+"fecha="+fecha+"total="+total+"metodoDePago="+metodoDePago+"numeroDeSeguimiento="+numeroDeSeguimiento+"fechaDeEntrega="+fechaDeEntrega+"idEmpleado="+idEmpleado);
}	

function update(){
	idPedido 			= document.formUserUpdate.idPedido.value;
	name 		= document.formUserUpdate.name.value;
	last_name 	= document.formUserUpdate.last_name.value;
	email 		= document.formUserUpdate.email.value;
	ajax = objectAjax();
	ajax.open("POST", "?c=administrator&m=updateuser", true);
	ajax.onreadystatechange=function() {
		if(ajax.readyState==4){
			read();
			$('#updateUser').modal('hide');
		}
	}
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
ajax.send("name="+name+"&last_name="+last_name+"&email="+email+"&idPedido="+idPedido);

}

function deleteUser(idPedido){	
	if(confirm('¿Esta seguro de eliminar este registro?')){						
	ajax = objectAjax();
	ajax.open("POST", "?c=administrator&m=deleteuser", true);
	ajax.onreadystatechange=function() {
		if(ajax.readyState==4){			
			read();		
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send("idPedido="+idPedido);
	}
}

function ModalRegister(){
	$('#addUser').modal('show');
}

function ModalUpdate(idPedido,name,last_name,email){			
	document.formUserUpdate.idPedido.value 			= idPedido;
	document.formUserUpdate.name.value 			= name;
	document.formUserUpdate.last_name.value 	= last_name;
	document.formUserUpdate.email.value 		= email;
	$('#updateUser').modal('show');
}

/*
	CRUD creado por Oscar Amado
	Contacto: oscarfamado@gmail.com
*/
var urlWS = "http://localhost/zombieapi";

$(document).ready(function(){
	/* CAMBIAR AMBITO */
	$(document).on('click', '.cambiarambito', function(e){
		localStorage.removeItem('ambito');
		localStorage.setItem('ambito',$(this).attr('rel'));
		//input_ambito
	});
	/* SESION YA INICIADA */
	if(localStorage.getItem('auth')=='true'){
		mainView.loadPage('home.html');
	}
	/* INICIAR SESIÓN */
	$(document).on('click', '#btn_iniciar_sesion', function(e){
		$.ajax({
			headers: {
			    "email" : $('#input_email').val(),
			    "pass" : $('#input_pass').val()
			},
			url : urlWS+'/login',
			method : 'POST',
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				localStorage.setItem('auth', true);
				localStorage.setItem('apikey', data[0].apikey);
				localStorage.setItem('userid', data[0].user_id);
				mainView.loadPage('home.html');
			},
			complete : function(data){
				myApp.hideIndicator();
			},
			error : function(data){
				myApp.alert('Usuario o contraseña incorrectos', '<i class="fa fa-exclamation-circle" aria-hidden="true" style="color:red"></i> Error');                 
			}
		})
	});
	/* CERRAR SESIÓN */
	$(document).on('click', '#btn_cerrar_sesion', function(e){
		localStorage.clear();
		mainView.loadPage('index.html');
	});
	/* AGREGAR META */
	$(document).on('click', '#btn_agregar_meta', function(e){
		ambito = localStorage.getItem('ambito');
		texto = $('#input_meta').val();
		var postData = {
			id_usuario : localStorage.getItem('userid'),
			ambito: localStorage.getItem('ambito'),
			texto : $('#input_meta').val()
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/meta',
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				//REFRESCAR METAS
				mainView.loadPage('metas.html?ambito='+ambito);
			},
			complete : function(data){
				myApp.hideIndicator();
			},
		});
	});
	/* ELIMINAR META */
	$(document).on('click', '.borrameta', function(e){
		id_meta = $(this).attr('rel');
		myApp.confirm('¿Está seguro de querer eliminar?','', function () {
			eliminarMeta(id_meta,localStorage.getItem("ambito"));
	    });
		//input_ambito
	});
	/* EDITAR META */
	$(document).on('click', '#btn_editar_meta', function(e){
		ambito = localStorage.getItem('ambito');
		id_meta = $('#id_meta').val();
		texto_meta = $('#input_meta').val();
		var postData = {
			texto : texto_meta
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/meta/'+id_meta,
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				mainView.reloadPreviousPage('metas.html?ambito='+ambito);
				mainView.back();

			},
			complete : function(data){
				myApp.hideIndicator();
			}
		})
	});

	/* AGREGAR TAREA */
	$(document).on('click', '#btn_agregar_tarea', function(e){
		texto = $('#input_tarea').val();
		var postData = {
			id_usuario : localStorage.getItem('userid'),
			id_meta : $('#id_meta').val(),
			ambito: localStorage.getItem('ambito'),
			texto : texto
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/tarea',
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				//REFRESCAR METAS
				mainView.loadPage('tareas.html?id_meta='+ $('#id_meta').val());
			},
			complete : function(data){
				myApp.hideIndicator();
			},
		});
	});
	/* ELIMINAR TAREA */
	$(document).on('click', '.borrartarea', function(e){
		id_tarea = $(this).attr('rel');
		myApp.confirm('¿Está seguro de querer eliminar?','', function () {
			eliminarTarea(id_tarea,$('#valor_id_meta').val());
	    });
		//input_ambito
	});

	/* EDITAR META */
	$(document).on('click', '#btn_editar_tarea', function(e){
		ambito = localStorage.getItem('ambito');
		id_tarea = $('#id_tarea').val();
		id_meta = $('#id_meta').val();
		texto_tarea = $('#input_tarea').val();
		var postData = {
			texto : texto_tarea
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/tarea/'+id_tarea,
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				mainView.loadPage('tareas.html?id_meta='+ $('#id_meta').val());
			},
			complete : function(data){
				myApp.hideIndicator();
			}
		})
	});

	/* CUMPLIR TAREA */
	$(document).on('click', '.cumplir_tarea', function(e){
		//console.log('cumplir')
		id_tarea =  $(this).attr('rel');
		status =  $(this).attr('status');
		var postData = {
			id_tarea : id_tarea,
			status : status
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/revision',
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				mainView.reloadPage('cumpli-metas.html');
			},
			complete : function(data){
				myApp.hideIndicator();
			}
		})
	});

	/* NO CUMPLIR TAREA */
	$(document).on('click', '.no_cumplir_tarea', function(e){
		//console.log('cumplir')
		id_tarea =  $(this).attr('rel');
		status =  $(this).attr('status');
		var postData = {
			id_tarea : id_tarea,
			status : status
		}
		$.ajax({
			method : 'POST',
			url : urlWS+'/revision',
			headers: {
				"token": localStorage.getItem("apikey")
			},
			data : postData,
			beforeSend : function(){
				myApp.showIndicator();
			},
			success : function(data){
				mainView.reloadPage('cumpli-metas.html');	
			},
			complete : function(data){
				myApp.hideIndicator();
			}
		})
	});

});

function refrescarMetas(ambito){
	$.ajax({
		url : urlWS+'/metas/'+localStorage.getItem('userid')+'/'+ambito,
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			$('#list_metas').html('');
			var output = '';
			$.each( data, function( key, value ) {
				output += '<li class="swipeout primarystatus"><div class="item-content swipeout-content"><a class="item-content item-link" href="tareas.html?id_meta='+value.id+'"><div class="item-media"><i class="fa fa-trophy" aria-hidden="true"></i></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+value.texto+'</div></div></div></a></div><div class="swipeout-actions-right"><a href="#" class="borrar borrameta" rel="'+value.id+'" >Eliminar</a><a href="editar-meta.html?id_meta='+value.id+'" class="swipeout-update editarmeta"  rel="'+value.id+'">Editar</a></div></li>';
			})
			$('#list_metas').html(output);
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
}

function eliminarMeta(id,ambito){
	$.ajax({
		url : urlWS+'/meta/'+id,
		type: 'DELETE',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			mainView.reloadPage('metas.html?ambito='+ambito);
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
}

function eliminarTarea(id,id_meta){
	$.ajax({
		url : urlWS+'/tarea/'+id,
		type: 'DELETE',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			mainView.reloadPage('tareas.html?id_meta='+id_meta);
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
}

function refrescarTareas(id){
	$.ajax({
		url : urlWS+'/tareas/'+id,
		type: 'GET',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			$('#list_metas').html('');
			var output = '';
			$.each( data, function( key, value ) {
				output += '<li class="swipeout primarystatus"><div class="item-content swipeout-content"><div class="item-media"><i class="fa fa-trophy" aria-hidden="true"></i></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+value.texto+'</div></div></div></div><div class="swipeout-actions-right"><a href="#" class="borrar borrartarea" rel="'+value.id+'" rel_id_meta="" >Eliminar</a><a href="editar-tarea.html?id_tarea='+value.id+'&id_meta='+$('#valor_id_meta').val()+'" class="swipeout-update editarmeta"  rel="'+value.id+'">Editar</a></div></li>';
			})
			$('#list_tareas').html(output);
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
}

myApp.onPageInit('metas', function (page) {
	refrescarMetas(page.query.ambito);
});   


myApp.onPageInit('tareas', function (page) {
	refrescarTareas(page.query.id_meta);
	$('#valor_id_meta').val(page.query.id_meta);
	$('.borrartarea').attr('rel_id_meta',page.query.id_meta);
	$('#boton_nueva_tarea').attr('href','tareaadd.html?id_meta='+page.query.id_meta);
	$('#atras_tarea').attr('href','metas.html?ambito='+localStorage.getItem("ambito"));
});  
myApp.onPageInit('tareaadd', function (page) {
	$('#id_meta').val(page.query.id_meta)
});   


myApp.onPageInit('editar-meta', function (page) {
	id_meta = page.query.id_meta;
	$.ajax({
		url : urlWS+'/meta/'+id_meta,
		type: 'GET',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			$('#id_meta').val(data[0].id);
			$('#input_meta').val(data[0].texto);
			//mainView.reloadPage(ambito+'.html');
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
});  

myApp.onPageInit('editar-tarea', function (page) {
	id_tarea = page.query.id_tarea;
	id_meta = page.query.id_meta;
	$('#id_meta').val(id_meta);
	$.ajax({
		url : urlWS+'/tarea/'+id_tarea,
		type: 'GET',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			$('#id_tarea').val(data[0].id);
			$('#input_tarea').val(data[0].texto);
			//mainView.reloadPage(ambito+'.html');
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
});   

myApp.onPageInit('cumplimetas', function (page) {
	id_usuario = localStorage.getItem('userid');
	$.ajax({
		url : urlWS+'/todas_tareas/'+id_usuario,
		type: 'GET',
		headers: {
			"token": localStorage.getItem("apikey")
		},
		beforeSend : function(){
			myApp.showIndicator();
		},
		success : function(data){
			var output = ''; 
			var pintar = 0;
			$.each( data, function( key, value ) {
				if(value.meta!='' && value.tareas!=''){
					output += '<li>'+value.meta.texto+':</li>';
					var tareas = value.tareas;
					$.each( tareas, function( key2, value2 ) {
						output += ' <li class="conteo_quitar"><a href="#" class="no_cumplir_tarea" rel="'+value2.id+'" status="0"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a><a href="#" class="cumplir_tarea"  rel="'+value2.id+'" status="1"><i class="fa fa-check-circle-o" aria-hidden="true"></i></a>'+value2.texto+'</li>'
					})
				}
			});
			$.each( data, function( key, value ) {
				if(value.meta!='' && value.tareas!=''){
					pintar = 1;
					return false;
				}
			});	
			if(pintar==0){
				$('#lista_cumplir').html('<li>No hay más tareas el día de hoy</li>');
			}else{
				$('#lista_cumplir').html(output);
			}
			//console.log(data);
		},
		complete : function(data){
			myApp.hideIndicator();
		}
	})
});   



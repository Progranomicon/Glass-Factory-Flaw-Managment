function setRoughMold(mold, section, position){
	$.ajax('DLC1.php',{type:"GET", data:{task:"mountMold", mold:mold, section:section, position:position},success:reciever, error:error_handler});
}
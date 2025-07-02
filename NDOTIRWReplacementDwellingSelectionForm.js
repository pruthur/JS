$(document).ready(function () {
	onRadioButtonChange();
});

function onRadioButtonChange(){
	
	var utilitiesRentYes = document.getElementById('RPDWSEL_UtilitiesRent_Id_0');
	var utilitiesRentNo = document.getElementById('RPDWSEL_UtilitiesRent_Id_1');
	
	//handling new,view and edit mode
	
	if ((!utilitiesRentNo.checked && !utilitiesRentYes.checked) || utilitiesRentNo.checked) {
        xmlForm.hideControl("UtilitiesType");
	}
	
	utilitiesRentYes.onclick = function () {
		if(utilitiesRentYes.checked)
        xmlForm.showControl("UtilitiesType");
    };
	
	utilitiesRentNo.onclick = function () {
		if(utilitiesRentNo.checked)
        xmlForm.hideControl("UtilitiesType");
    };
};
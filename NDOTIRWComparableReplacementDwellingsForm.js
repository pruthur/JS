$(document).ready(function () {
	onRadioButtonChange();
});

function onRadioButtonChange(){
	
	var utilitiesRent1Yes = document.getElementById('CMPRPDW_UtilitiesRent1_Id_0');
	var utilitiesRent1No = document.getElementById('CMPRPDW_UtilitiesRent1_Id_1');
	
	var utilitiesRent2Yes = document.getElementById('CMPRPDW_UtilitiesRent2_Id_0');
	var utilitiesRent2No = document.getElementById('CMPRPDW_UtilitiesRent2_Id_1');
	
	var utilitiesRent3Yes = document.getElementById('CMPRPDW_UtilitiesRent3_Id_0');
	var utilitiesRent3No = document.getElementById('CMPRPDW_UtilitiesRent3_Id_1');
	
	//handling new,view and edit mode
	
	if ((!utilitiesRent1No.checked && !utilitiesRent1Yes.checked) || utilitiesRent1No.checked) {
        xmlForm.hideControl("UtilitiesType1");
	}
	
	if ((!utilitiesRent2No.checked && !utilitiesRent2Yes.checked) || utilitiesRent2No.checked) {
        xmlForm.hideControl("UtilitiesType2");
	}
	
	if ((!utilitiesRent3No.checked && !utilitiesRent3Yes.checked) || utilitiesRent3No.checked) {
        xmlForm.hideControl("UtilitiesType3");
	}
	
	utilitiesRent1Yes.onclick = function () {
		if(utilitiesRent1Yes.checked)
        xmlForm.showControl("UtilitiesType1");
    };
	
	utilitiesRent1No.onclick = function () {
		if(utilitiesRent1No.checked)
        xmlForm.hideControl("UtilitiesType1");
    };
	
	utilitiesRent2Yes.onclick = function () {
		if(utilitiesRent2Yes.checked)
        xmlForm.showControl("UtilitiesType2");
    };
	
	utilitiesRent2No.onclick = function () {
		if(utilitiesRent2No.checked)
        xmlForm.hideControl("UtilitiesType2");
    };
	
	utilitiesRent3Yes.onclick = function () {
		if(utilitiesRent3Yes.checked)
        xmlForm.showControl("UtilitiesType3");
    };
	
	utilitiesRent3No.onclick = function () {
		if(utilitiesRent3No.checked)
        xmlForm.hideControl("UtilitiesType3");
    };
		
};

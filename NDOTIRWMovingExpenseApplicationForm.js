$(document).ready(function () {
	onRadioButtonChange();
});

function onRadioButtonChange(){
	
	var moveoption1 = document.getElementById('MOVEXPN_MoveOption_Id_0');
	var moveoption2 = document.getElementById('MOVEXPN_MoveOption_Id_1');
	
	//handling new,view and edit mode
	
	if (moveoption1.checked) {
		xmlForm.showControl("CommercialMove");
		xmlForm.hideControl("SelfMove");
	} else if (moveoption2.checked) {
		xmlForm.showControl("SelfMove");
		xmlForm.hideControl("CommercialMove");
	} else {
		xmlForm.hideControl("CommercialMove");
		xmlForm.hideControl("SelfMove");
	}
	
	moveoption1.onclick = function () {
		if (moveoption1.checked) {
			xmlForm.showControl("CommercialMove");
			xmlForm.hideControl("SelfMove");
		}

    };
	
	moveoption2.onclick = function () {
		if (moveoption2.checked) {
			xmlForm.showControl("SelfMove");
			xmlForm.hideControl("CommercialMove");
		}
    };
};
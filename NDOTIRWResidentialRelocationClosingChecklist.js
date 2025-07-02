$(document).ready(function () {
	onRadioButtonChange();
});

function onRadioButtonChange(){
	
	var relocationAppealReceivedYes = document.getElementById('RESRECC_RelocationAppealReceived_Id_0');
	var relocationAppealReceivedNo = document.getElementById('RESRECC_RelocationAppealReceived_Id_1');
	
	//handling new,view and edit mode
	
	if (relocationAppealReceivedYes.checked) {
		xmlForm.showControl("RelocationAppealReceivedDated");
		xmlForm.showControl("RelocationAppealReplyDated");
	} 
	else {
		xmlForm.hideControl("RelocationAppealReceivedDated");
		xmlForm.hideControl("RelocationAppealReplyDated");
	}
	
	relocationAppealReceivedYes.onclick = function () {
		if (relocationAppealReceivedYes.checked) {
			xmlForm.showControl("RelocationAppealReceivedDated");
			xmlForm.showControl("RelocationAppealReplyDated");
		}

    };
	
	relocationAppealReceivedNo.onclick = function () {
		if (relocationAppealReceivedNo.checked) {
            xmlForm.setControlValue("RelocationAppealReceivedDated", '', null);
            xmlForm.setControlValue("RelocationAppealReplyDated", '', null);
			xmlForm.hideControl("RelocationAppealReceivedDated");
			xmlForm.hideControl("RelocationAppealReplyDated");
		}
    };
};
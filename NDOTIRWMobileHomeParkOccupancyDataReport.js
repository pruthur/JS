$(document).ready(function () {
	onRadioButtonChange();
});

function onRadioButtonChange(){
	var owner = document.getElementById('MHPOCDR_TypeOfOccupancy_Id_0');
	var tenant = document.getElementById('MHPOCDR_TypeOfOccupancy_Id_1');
	
	var singleWide = document.getElementById('MHPOCDR_MobileHomeType_Id_0');
	var doubleWide = document.getElementById('MHPOCDR_MobileHomeType_Id_1');
	var others = document.getElementById('MHPOCDR_MobileHomeType_Id_2');

//handling new,view and edit mode

if (tenant.checked) {
	xmlForm.enableControl("NameOfOwner");
	xmlForm.enableControl("AddressOfOwner");
} 
else {
	xmlForm.disableControl("NameOfOwner");
	xmlForm.disableControl("AddressOfOwner");
}

owner.onclick = function () {
	if (owner.checked) {
		xmlForm.setControlValue("NameOfOwner", "");
		xmlForm.setControlValue("AddressOfOwner", "");
		
		xmlForm.disableControl("NameOfOwner");
		xmlForm.disableControl("AddressOfOwner");
	}

};

tenant.onclick = function () {
	if (tenant.checked) {
		xmlForm.enableControl("NameOfOwner");
		xmlForm.enableControl("AddressOfOwner");
	}

};

if (others.checked) {
	xmlForm.enableControl("Specify");
} 
else {
	xmlForm.disableControl("Specify");
}

singleWide.onclick = function () {
	if (singleWide.checked) {
		xmlForm.setControlValue("Specify", "");
		xmlForm.disableControl("Specify");
	}
};

doubleWide.onclick = function () {
	if (doubleWide.checked) {
		xmlForm.setControlValue("Specify", "");
		xmlForm.disableControl("Specify");
	}
};

others.onclick = function () {
	if (others.checked) {
		xmlForm.enableControl("Specify");
	}
};
	
};
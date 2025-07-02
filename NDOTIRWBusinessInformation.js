$(window).on('load', function () {
    // Type of Operation change listeners
    document.getElementById('BSNINFM_TypeOfOperation_Id_0').addEventListener('change', onTypeofOperationRadioButtonChange);
    document.getElementById('BSNINFM_TypeOfOperation_Id_1').addEventListener('change', onTypeofOperationRadioButtonChange);
    document.getElementById('BSNINFM_TypeOfOperation_Id_2').addEventListener('change', onTypeofOperationRadioButtonChange);
    document.getElementById('BSNINFM_TypeOfOperation_Id_3').addEventListener('change', onTypeofOperationRadioButtonChange);


    // Initialize both on load
    onTypeofOperationRadioButtonChange();
    onBusinessEntityRadioButtonChange();
});

function onTypeofOperationRadioButtonChange() {
    var BusinessOper = document.getElementById('BSNINFM_TypeOfOperation_Id_0');
    var SmallBusinessOper = document.getElementById('BSNINFM_TypeOfOperation_Id_1');
    var FarmOper = document.getElementById('BSNINFM_TypeOfOperation_Id_2');
    var NonProfitOper = document.getElementById('BSNINFM_TypeOfOperation_Id_3');

    // Hide all sections first
    xmlForm.hideContainer('Section_BusinessInfo');
    xmlForm.hideContainer('Section_SmallBusinessInfo');
    xmlForm.hideContainer('Section_FarmInfo');
    xmlForm.hideContainer('Section_Non-ProfitOrganizationInfo');


    // Show the section based on the selected radio button
    if (BusinessOper.checked) {
        xmlForm.showContainer('Section_BusinessInfo');
        setRequiredBusinessSectionField();
        UnsetRequiredFarmSectionField();
        UnsetRequiredNonProfitOrgnSectionField();
        UnsetRequiredSmallBusinessSectionField();
        ClearSmallBusinessInformationSection();
        ClearFarmInformationSection();
        ClearNonProfitOrgnzInformationSection();
    } else if (SmallBusinessOper.checked) {
        xmlForm.showContainer('Section_SmallBusinessInfo');
        setRequiredSmallBusinessSectionField();
        UnsetRequiredBusinessSectionField();
        UnsetRequiredNonProfitOrgnSectionField();
        UnsetRequiredFarmSectionField();
        ClearBusinessInformationSection();
        ClearFarmInformationSection();
        ClearNonProfitOrgnzInformationSection();

    } else if (FarmOper.checked) {
        xmlForm.showContainer('Section_FarmInfo');
        setRequiredFarmSectionField();
        UnsetRequiredBusinessSectionField();
        UnsetRequiredNonProfitOrgnSectionField();
        UnsetRequiredSmallBusinessSectionField();
        ClearBusinessInformationSection();
        ClearSmallBusinessInformationSection();
        ClearNonProfitOrgnzInformationSection();

    } else if (NonProfitOper.checked) {
        xmlForm.showContainer('Section_Non-ProfitOrganizationInfo');
        setRequiredNonProfitOrgnSectionField();
        UnsetRequiredFarmSectionField();
        UnsetRequiredBusinessSectionField();
        UnsetRequiredSmallBusinessSectionField();
        ClearBusinessInformationSection();
        ClearSmallBusinessInformationSection();
        ClearFarmInformationSection();
    }
    else {
        UnsetRequiredBusinessSectionField();
        UnsetRequiredFarmSectionField();
        UnsetRequiredNonProfitOrgnSectionField();
        UnsetRequiredSmallBusinessSectionField();

    }
}


function onBusinessEntityRadioButtonChange() {
    var SoleProprietorship = document.getElementById('BSNINFM_BusinessEntity_Id_0');
    var Partnership = document.getElementById('BSNINFM_BusinessEntity_Id_1');
    var Corporation = document.getElementById('BSNINFM_BusinessEntity_Id_2');
    var LLC = document.getElementById('BSNINFM_BusinessEntity_Id_3');

    DisablePartnershipControl();
    DisableCorporationControl();
    DisableLLCControl();
    DisableSoleProprietorshipControl();
    var mode = GetQueryStringParams("Mode");


    if (mode.toLowerCase() == 'view') {
        DisablePartnershipControl();
        DisableCorporationControl();
        DisableLLCControl();
        DisableSoleProprietorshipControl();
    }
    else {

        if (SoleProprietorship.checked) {
            EnableSoleProprietorshipControl();
            DisablePartnershipControl();
            DisableCorporationControl();
            DisableLLCControl();
            ClearCorporationControl();
            ClearPartnershipControl();
            ClearLLCControl();

        } else if (Partnership.checked) {
            EnablePartnershipControl();
            DisableSoleProprietorshipControl();
            DisableCorporationControl();
            DisableLLCControl();
            ClearCorporationControl();
            ClearSoleProprietorshipControl();
            ClearLLCControl();

        } else if (Corporation.checked) {
            EnableCorporationControl();
            DisableSoleProprietorshipControl();
            DisablePartnershipControl();
            DisableLLCControl();
            ClearSoleProprietorshipControl();
            ClearPartnershipControl();
            ClearLLCControl();

        } else if (LLC.checked) {
            DisableSoleProprietorshipControl();
            DisablePartnershipControl();
            DisableCorporationControl();
            EnableLLCControl();
            ClearCorporationControl();
            ClearSoleProprietorshipControl();
            ClearPartnershipControl();

        }
        SoleProprietorship.onclick = function () {
            EnableSoleProprietorshipControl();
            DisablePartnershipControl();
            DisableCorporationControl();
            DisableLLCControl();
            ClearCorporationControl();
            ClearPartnershipControl();
            ClearLLCControl();

        }

        Partnership.onclick = function () {
            DisableSoleProprietorshipControl();
            EnablePartnershipControl();
            DisableCorporationControl();
            DisableLLCControl();
            ClearCorporationControl();
            ClearSoleProprietorshipControl();
            ClearLLCControl();

        }

        Corporation.onclick = function () {
            DisableSoleProprietorshipControl();
            DisablePartnershipControl();
            EnableCorporationControl();
            DisableLLCControl();
            ClearSoleProprietorshipControl();
            ClearPartnershipControl();
            ClearLLCControl();

        }
        LLC.onclick = function () {
            DisableSoleProprietorshipControl();
            DisablePartnershipControl();
            DisableCorporationControl();
            EnableLLCControl();
            ClearCorporationControl();
            ClearSoleProprietorshipControl();
            ClearPartnershipControl();

        }
    }
}
function EnableValidator(controltovalidate, enable) {
    if (typeof Page_Validators != 'undefined') {
        for (var i = 0; i <= Page_Validators.length; i++) {
            if (Page_Validators[i] != null) {
                if (Page_Validators[i].controltovalidate == controltovalidate) {
                    var val = Page_Validators[i];
                    if (val.className == 'base-validator required') {
                        val.enabled = enable;
                        val.isvalid = true;
                        ValidatorUpdateDisplay(val);
                    }
                }
            }
        }
    }
}


function ClearBusinessInformationSection() {
    xmlForm.setControlValue("BusinessName", '', null);
    xmlForm.setControlValue("BusinessCityTown", '', null);
    xmlForm.setControlValue("BusinessZipCode", '', null);
    xmlForm.setControlValue("BusinessTelephoneNo", '', null);
    xmlForm.setControlValue("BusinessDateofOccupancy", '', null);
    xmlForm.setControlValue("BusinessStreetAddress", '', null);
    xmlForm.setControlValue("BusinessState", '', null);
    xmlForm.setControlValue("BusinessCountry", '', null);
    xmlForm.setControlValue("BusinessNoofEmployees", '', null);
}

function ClearSmallBusinessInformationSection() {
    xmlForm.setControlValue("SmallBusinessName", '', null);
    xmlForm.setControlValue("SmallBusinessCityTown", '', null);
    xmlForm.setControlValue("SmallBusinessZipCode", '', null);
    xmlForm.setControlValue("SmallBusinessTelephoneNo", '', null);
    xmlForm.setControlValue("SmallBusinessLengthoftime", '', null);
    xmlForm.setControlValue("SmallBusinessStreetAddress", '', null);
    xmlForm.setControlValue("SmallBusinessState", '', null);
    xmlForm.setControlValue("SmallBusinessCountry", '', null);
    xmlForm.setControlValue("SmallBusinessNoofEmployees", '', null);
}

function ClearFarmInformationSection() {
    xmlForm.setControlValue("FarmInfoName", '', null);
    xmlForm.setControlValue("FarmInfoCityTown", '', null);
    xmlForm.setControlValue("FarmInfoZipCode", '', null);
    xmlForm.setControlValue("FarmInfoTelephoneNo", '', null);
    xmlForm.setControlValue("FarmInfoLengthoftime", '', null);
    xmlForm.setControlValue("FarmInfoStreetAddress", '', null);
    xmlForm.setControlValue("FarmInfoState", '', null);
    xmlForm.setControlValue("FarmInfoCountry", '', null);
    xmlForm.setControlValue("FarmInfoNoofEmployees", '', null);

}
function ClearNonProfitOrgnzInformationSection() {
    xmlForm.setControlValue("NonProfitOrgnName", '', null);
    xmlForm.setControlValue("NonProfitOrgnTown", '', null);
    xmlForm.setControlValue("NonProfitOrgnZipCode", '', null);
    xmlForm.setControlValue("NonProfitOrgnTelephoneNo", '', null);
    xmlForm.setControlValue("NonProfitOrgnLengthoftime", '', null);
    xmlForm.setControlValue("NonProfitOrgnStreetAddress", '', null);
    xmlForm.setControlValue("NonProfitOrgnState", '', null);
    xmlForm.setControlValue("NonProfitOrgnCountry", '', null);
    xmlForm.setControlValue("NonProfitOrgnNoofEmployees", '', null);

}

function EnableSoleProprietorshipControl() {
    xmlForm.enableControl('SoleProprietorshipOwnerName');
    xmlForm.enableControl('SoleProprietorshipLawfully');
}

function DisableSoleProprietorshipControl() {
    xmlForm.disableControl('SoleProprietorshipOwnerName');
    xmlForm.disableControl('SoleProprietorshipLawfully');

}

function ClearSoleProprietorshipControl() {
    xmlForm.setControlValue("SoleProprietorshipOwnerName", '', null);
    xmlForm.setControlValue("SoleProprietorshipLawfully", '', null);
}
function EnablePartnershipControl() {
    xmlForm.enableControl('Personlawfully');
    const buttons = document.querySelectorAll("[FormDesignerName='Partners'] input[type='submit']");

    // Disable buttons at index 2, 3, and 4
    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = false;
        });
    }
}

function DisablePartnershipControl() {
    xmlForm.disableControl('Personlawfully');

    const buttons = document.querySelectorAll("[FormDesignerName='Partners'] input[type='submit']");

    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    }

}

function ClearPartnershipControl() {
    xmlForm.setControlValue("Personlawfully", '', null);
    xmlForm.DynamicGrid.bindGridRows('Partners', []);

}

function EnableCorporationControl() {
    xmlForm.enableControl('CorportaionBusAuth');
    const buttons = document.querySelectorAll("[FormDesignerName='ManagerMembersoftheCorporation'] input[type='submit']");

    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = false;
        });
    }
}

function DisableCorporationControl() {
    xmlForm.disableControl('CorportaionBusAuth');
    const buttons = document.querySelectorAll("[FormDesignerName='ManagerMembersoftheCorporation'] input[type='submit']");

    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    
    }

}

function ClearCorporationControl() {
    xmlForm.setControlValue("CorportaionBusAuth", '', null);
    xmlForm.DynamicGrid.bindGridRows('ManagerMembersoftheCorporation', []);

}
function EnableLLCControl() {
    xmlForm.enableControl('LLCBusAuth');
    const buttons = document.querySelectorAll("[FormDesignerName='ManagerMembersoftheLLC'] input[type='submit']");

    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = false;
        });
    }
}

function DisableLLCControl() {
    xmlForm.disableControl('LLCBusAuth');
    const buttons = document.querySelectorAll("[FormDesignerName='ManagerMembersoftheLLC'] input[type='submit']");

    if (buttons.length > 0) {
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    }

}
function ClearLLCControl() {
    xmlForm.setControlValue("LLCBusAuth", '', null);
    xmlForm.DynamicGrid.bindGridRows('ManagerMembersoftheLLC', []);

}
function setRequiredBusinessSectionField() {
    EnableValidator(xmlForm.getControlClientId('BusinessName'), true);
    EnableValidator(xmlForm.getControlClientId('BusinessCityTown'), true);
    EnableValidator(xmlForm.getControlClientId('BusinessZipCode'), true);
    EnableValidator(xmlForm.getControlClientId('BusinessStreetAddress'), true);
    EnableValidator(xmlForm.getControlClientId('BusinessState'), true);
    EnableValidator(xmlForm.getControlClientId('BusinessCountry'), true);

}
function UnsetRequiredBusinessSectionField() {
    EnableValidator(xmlForm.getControlClientId('BusinessName'), false);
    EnableValidator(xmlForm.getControlClientId('BusinessCityTown'), false);
    EnableValidator(xmlForm.getControlClientId('BusinessZipCode'), false);
    EnableValidator(xmlForm.getControlClientId('BusinessStreetAddress'), false);
    EnableValidator(xmlForm.getControlClientId('BusinessState'), false);
    EnableValidator(xmlForm.getControlClientId('BusinessCountry'), false);

}
function setRequiredSmallBusinessSectionField() {
    EnableValidator(xmlForm.getControlClientId('SmallBusinessName'), true);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessCityTown'), true);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessZipCode'), true);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessStreetAddress'), true);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessState'), true);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessCountry'), true);

}
function UnsetRequiredSmallBusinessSectionField() {
    EnableValidator(xmlForm.getControlClientId('SmallBusinessName'), false);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessCityTown'), false);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessZipCode'), false);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessStreetAddress'), false);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessState'), false);
    EnableValidator(xmlForm.getControlClientId('SmallBusinessCountry'), false);

}
function setRequiredFarmSectionField() {
    EnableValidator(xmlForm.getControlClientId('FarmInfoName'), true);
    EnableValidator(xmlForm.getControlClientId('FarmInfoCityTown'), true);
    EnableValidator(xmlForm.getControlClientId('FarmInfoZipCode'), true);
    EnableValidator(xmlForm.getControlClientId('FarmInfoStreetAddress'), true);
    EnableValidator(xmlForm.getControlClientId('FarmInfoState'), true);
    EnableValidator(xmlForm.getControlClientId('FarmInfoCountry'), true);

}
function UnsetRequiredFarmSectionField() {
    EnableValidator(xmlForm.getControlClientId('FarmInfoName'), false);
    EnableValidator(xmlForm.getControlClientId('FarmInfoCityTown'), false);
    EnableValidator(xmlForm.getControlClientId('FarmInfoZipCode'), false);
    EnableValidator(xmlForm.getControlClientId('FarmInfoStreetAddress'), false);
    EnableValidator(xmlForm.getControlClientId('FarmInfoState'), false);
    EnableValidator(xmlForm.getControlClientId('FarmInfoCountry'), false);

}
function setRequiredNonProfitOrgnSectionField() {
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnName'), true);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnTown'), true);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnZipCode'), true);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnStreetAddress'), true);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnState'), true);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnCountry'), true);

}
function UnsetRequiredNonProfitOrgnSectionField() {
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnName'), false);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnTown'), false);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnZipCode'), false);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnStreetAddress'), false);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnState'), false);
    EnableValidator(xmlForm.getControlClientId('NonProfitOrgnCountry'), false);

}

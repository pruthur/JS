$(document).ready(function () {
    if (document.getElementById('APPRASL_AppraisalType_Id_1').checked) {
        $('#APPRASL_ContractAgreementNumber_Id').attr("value", "");
        xmlForm.disableControl("ContractAgreementNumber");
    }

    setBeforeAcquisitionTotal();
    setValuePartAcquiredTotal();

    if (document.getElementById('APPRASL_ReviewAppraisalType_Id_1').checked) {
        $('#APPRASL_ReviewContractAgreementNumber_Id').attr("value", "");
        xmlForm.disableControl("ReviewContractAgreementNumber");
    }
    onRadioButtonChange();

    $('[formdesignername="Land"] input[type="text"]').blur(() => {
        setBeforeAcquisitionTotal();
    });

    $('[formdesignername="Imp1"] input[type="text"]').blur(() => {
        setBeforeAcquisitionTotal();
    });

    $('[formdesignername="AOth"] input[type="text"]').blur(() => {
        setBeforeAcquisitionTotal();
    });

    $('[formdesignername="FeeP"] input[type="text"]').blur(() => {
        setValuePartAcquiredTotal();
    });

    $('[formdesignername="Perm"] input[type="text"]').blur(() => {
        setValuePartAcquiredTotal();
    });

    $('[formdesignername="Imp2"] input[type="text"]').blur(() => {
        setValuePartAcquiredTotal();
    });

    $('[formdesignername="BOth"] input[type="text"]').blur(() => {
        setValuePartAcquiredTotal();
    });

    $('[formdesignername="RemVal"] input[type="text"]').blur(() => {
        setSeveranceDamagesTotal();
    });

    $('[formdesignername="CCure"] input[type="text"]').blur(() => {
        setJustCompensationTotal();
    });

    $('[formdesignername="ParTE"] input[type="text"]').blur(() => {
        setJustCompensationTotal();
    });

    if (xmlForm.getControlValue('ParcelGrp') != '') {
        xmlForm.disableControl("ParcelGrpTrigger");
    }
});


function onRadioButtonChange() {
    var mode = GetQueryStringParams("Mode");
    var ContractAppraiserPicker = document.getElementById('C1_ContractAppraiserTrigger_ContractAppraiserPicker_btnShowPicker');
    var ContractReviewAppraiserPicker = document.getElementById('C1_ContractReviewAppraiserTrigger_ContractReviewAppraiserPicker_btnShowPicker');
    var InhouseAppraiserPicker = document.getElementById('C1_InhouseAppraiserTrigger_InhouseAppraiserPicker_btnShowPicker');
    var InhouseReviewAppraiserPicker = document.getElementById('C1_InhouseReviewAppraiserTrigger_InhouseReviewAppraiserPicker_btnShowPicker');

    var ContractAppraiser = document.getElementById('APPRASL_AppraisalType_Id_0');
    var InhouseAppraiser = document.getElementById('APPRASL_AppraisalType_Id_1');
    var ContractReviewAppraiser = document.getElementById('APPRASL_ReviewAppraisalType_Id_0');
    var InhouseReviewAppraiser = document.getElementById('APPRASL_ReviewAppraisalType_Id_1');

    if (mode && (mode.toLowerCase() == "new")) {
        ContractAppraiserPicker.style.display = "none";
        ContractReviewAppraiserPicker.style.display = "none";
        InhouseAppraiserPicker.style.display = "none";
        InhouseReviewAppraiserPicker.style.display = "none";
        $("#APPRASL_AppraisalType_Id_0").removeAttr('checked');
        $("#APPRASL_AppraisalType_Id_1").removeAttr('checked');
        $("#APPRASL_ReviewAppraisalType_Id_0").removeAttr('checked');
        $("#APPRASL_ReviewAppraisalType_Id_1").removeAttr('checked');
    }

    if (mode && (mode.toLowerCase() == "edit" || mode.toLowerCase() == 'view')) {
        if (document.getElementById('APPRASL_AppraisalType_Id_0').checked)
            InhouseAppraiserPicker.style.display = "none";

        if (document.getElementById('APPRASL_AppraisalType_Id_1').checked)
            ContractAppraiserPicker.style.display = "none";

        if (document.getElementById('APPRASL_ReviewAppraisalType_Id_0').checked)
            InhouseReviewAppraiserPicker.style.display = "none";

        if (document.getElementById('APPRASL_ReviewAppraisalType_Id_1').checked)
            ContractReviewAppraiserPicker.style.display = "none";
    }

    ContractAppraiser.onclick = function () {
        ContractAppraiserPicker.style.display = "inline";
        InhouseAppraiserPicker.style.display = "none";
        $('#APPRASL_InhouseAppraiser_Id')[0].value = "";
        $('#APPRASL_ContractAgreementNumber_Id').attr('disabled', false);
        $('#APPRASL_ContractAgreementNumber_Id').attr('readonly', false);
    };

    InhouseAppraiser.onclick = function () {
        ContractAppraiserPicker.style.display = "none";
        InhouseAppraiserPicker.style.display = "inline";
        $('#APPRASL_ContractAppraiser_Id')[0].value = "";
        $('#APPRASL_ContractAgreementNumber_Id').attr("value", "");
        xmlForm.setControlValue("ContractAgreementNumber", "");
        $('#APPRASL_ContractAgreementNumber_Id').attr('readonly', true);
    };

    ContractReviewAppraiser.onclick = function () {
        ContractReviewAppraiserPicker.style.display = "inline";
        InhouseReviewAppraiserPicker.style.display = "none";
        $('#APPRASL_InhouseReviewAppraiser_Id')[0].value = "";
        $('#APPRASL_ReviewContractAgreementNumber_Id').attr('disabled', false);
        $('#APPRASL_ReviewContractAgreementNumber_Id').attr('readonly', false);
    };

    InhouseReviewAppraiser.onclick = function () {
        ContractReviewAppraiserPicker.style.display = "none";
        InhouseReviewAppraiserPicker.style.display = "inline";
        $('#APPRASL_ContractReviewAppraiser_Id')[0].value = "";
        $('#APPRASL_ContractReviewAppraiser_Id').attr("value", "");
        xmlForm.setControlValue("ReviewContractAgreementNumber", "");
        $('#APPRASL_ReviewContractAgreementNumber_Id').attr('readonly', true);
    };
};

function BindDynamicGrid() {
    xmlForm.disableControl("ParcelGrpTrigger");
    var parcelGrp = xmlForm.getControlValue('ParcelGrp');
    if (parcelGrp != undefined) {
        $.ajax({
            type: "GET",
            url: '/api/NDOTIRWINAppraisal/AppraisalParcelGroupDG?parcelGrp=' + parcelGrp,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    xmlForm.DynamicGrid.bindGridRows("PropertyOwnerDG", data.Table);
                    xmlForm.DynamicGrid.bindGridRows("NDOTParcelNumberDG", data.Table1);
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
    return false;
}

function setBeforeAcquisitionTotal() {
    ;
    var land = parseFloat(xmlForm.getControlValue('Land'));
    var Imp1 = parseFloat(xmlForm.getControlValue('Imp1'));
    var AOth = parseFloat(xmlForm.getControlValue('AOth'));
    var Bacq = land + Imp1 + AOth;
    xmlForm.setControlValue('BAcq', '', Bacq);
    setValueRemainderTotal();
}

function setValuePartAcquiredTotal() {
    var FeeP = parseFloat(xmlForm.getControlValue('FeeP'));
    var Perm = parseFloat(xmlForm.getControlValue('Perm'));
    var Imp2 = parseFloat(xmlForm.getControlValue('Imp2'));
    var BOth = parseFloat(xmlForm.getControlValue('BOth'));
    var PAcq = FeeP + Perm + Imp2 + BOth;
    xmlForm.setControlValue('PAcq', '', PAcq);
    setValueRemainderTotal();
}

function setValueRemainderTotal() {
    var ValRem = parseFloat(xmlForm.getControlValue('BAcq')) - parseFloat(xmlForm.getControlValue('PAcq'));
    xmlForm.setControlValue('ValRem', '', ValRem);
    setSeveranceDamagesTotal();
}

function setSeveranceDamagesTotal() {
    var SevBen = parseFloat(xmlForm.getControlValue('ValRem')) - parseFloat(xmlForm.getControlValue('RemVal'));
    xmlForm.setControlValue('SevBen', '', SevBen);
    setJustCompensationTotal();
}

function setJustCompensationTotal() {
    var JustComp = parseFloat(xmlForm.getControlValue('PAcq')) + parseFloat(xmlForm.getControlValue('SevBen'))
        + parseFloat(xmlForm.getControlValue('CCure')) + parseFloat(xmlForm.getControlValue('ParTE'));
    xmlForm.setControlValue('JustComp', '', JustComp);
}
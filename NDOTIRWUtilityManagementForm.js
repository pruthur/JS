$(document).ready(function () {


    let dropdownid = "#" + $("[id$='UTILMGT_ReplacementEasement_Id']").attr('id');
    let currentval = $(dropdownid + " option:selected").text();

    if (currentval == "Joint Use Quit Claim" || currentval == "Consent to Common Use") {
        xmlForm.showControl("EstimatedTransferDate");
    }
    else {
        xmlForm.hideControl("EstimatedTransferDate");
    }

    $(dropdownid).change(function () {
        let currentdropdownid = "#" + $("[id$='UTILMGT_ReplacementEasement_Id']").attr('id');
        let currentselectedval = $(currentdropdownid + " option:selected").text();

        if (currentselectedval == "Joint Use Quit Claim" || currentselectedval == "Consent to Common Use") {
            xmlForm.showControl("EstimatedTransferDate");
            xmlForm.setControlValue("EstimatedTransferDate", '', null);
        }
        else {
            xmlForm.hideControl("EstimatedTransferDate");
            xmlForm.setControlValue("EstimatedTransferDate", '', null);
        }
    });

    if (xmlForm.getControlValue("FormCurrentStatus") == "Utility Management Closeout") {
        DisableDynamicGridsEdit();
    }

});

function DisableDynamicGridsEdit() {
    $($("input[value='Add']")).prop('disabled', 'disabled');
    $($("input[value='Edit']")).prop('disabled', 'disabled');
    $($("input[value='Delete']")).prop('disabled', 'disabled');
}
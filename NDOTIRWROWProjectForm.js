
$(document).ready(function () {
    var currentRoles = $("#currentUserRoles").val();
    var split_currentRoles = currentRoles.split(",");
    var WFStatus = $("#WFStatus").val();

    if (WFStatus.toLowerCase() == "draft") {
        xmlForm.hideContainer("ROWCertification");
    }

    if (ValidateManager(split_currentRoles)
    ) {
        $('[formdesignername="ROWProjectAssignment"]').find('table').last().find('input[value="Delete"]').show()
        $('[formdesignername="ROWProjectAssignment"]').find('table').last().find('input[value="Add"]').show()

    } else {
        $('[formdesignername="ROWProjectAssignment"]').find('table').last().find('input[value="Delete"]').hide()
        $('[formdesignername="ROWProjectAssignment"]').find('table').last().find('input[value="Add"]').hide()
    }

    if (!ValidateManager(split_currentRoles) && !ValidateSupervisor(split_currentRoles))
        $('[formdesignername="ROWProjectAssignment"]').find('table').last().find('input[value="Edit"]').hide()


});

function BeforeRowAddScript() {
    xmlForm.showControl("CompletionDate", "ROWProjectAssignment");
}

function BeforeRowEditScript(gridID, selectedRow) {
    var currentRoles = $("#currentUserRoles").val();
    var split_currentRoles = currentRoles.split(",");
    var hdnUserID = $("#hdnUserID").val();;
    var mastertable = $find(gridID).get_masterTableView();
    var supervisor = mastertable.getCellByColumnUniqueName(selectedRow, "SupervisorID").innerHTML;
    if (ValidateSupervisor(split_currentRoles)
    ) {
        xmlForm.disableControl("Section", "ROWProjectAssignment");
        xmlForm.disableControl("DueDate", "ROWProjectAssignment");
        if (hdnUserID === supervisor) {
            xmlForm.enableControl("Comments", "ROWProjectAssignment");
        }
        else {
            xmlForm.disableControl("Comments", "ROWProjectAssignment");
        }
        $("#C1_SupervisorPickerTrigger_SupervisorPicker_btnShowPicker").attr('disabled', true);
    }
    else if (ValidateManager(split_currentRoles)) {
        xmlForm.enableControl("Section", "ROWProjectAssignment");
        xmlForm.enableControl("DueDate", "ROWProjectAssignment");
        xmlForm.enableControl("Comments", "ROWProjectAssignment");
        $("#C1_SupervisorPickerTrigger_SupervisorPicker_btnShowPicker").removeAttr('disabled');
        xmlForm.showControl("CompletionDate", "ROWProjectAssignment");
    }
    else {
        xmlForm.enableControl("Section", "ROWProjectAssignment");
        xmlForm.enableControl("DueDate", "ROWProjectAssignment");
        xmlForm.enableControl("Comments", "ROWProjectAssignment");
        $("#C1_SupervisorPickerTrigger_SupervisorPicker_btnShowPicker").removeAttr('disabled');
    }

    if (hdnUserID === supervisor) {
        xmlForm.showControl("CompletionDate", "ROWProjectAssignment");
    } else {
        xmlForm.hideControl("CompletionDate", "ROWProjectAssignment");
    }
    return true;
}

function ValidateSupervisor(split_currentRoles) {
    if (split_currentRoles.includes("ROW Suprv Acquisition") ||
        split_currentRoles.includes("ROW Suprv Utilities") ||
        split_currentRoles.includes("ROW Suprv Appraisal") ||
        split_currentRoles.includes("ROW Supervisor SS") ||
        split_currentRoles.includes("ROW Suprv Property Management") ||
        split_currentRoles.includes("ROW Engineering Tech V SS"))
        return true;
    else
        return false;

}

function ValidateManager(split_currentRoles) {
    if (split_currentRoles.includes("ROW Manager 1 SS") ||
        split_currentRoles.includes("ROW Deputy Chief") ||
        split_currentRoles.includes("ROW Assistant Chief Acquisition") ||
        split_currentRoles.includes("ROW Assistant Chief Utilities") ||
        split_currentRoles.includes("ROW Assistant Chief Adm") ||
        split_currentRoles.includes("Administrator"))
        return true;
    else
        return false;
}


function ShowHideCompletionDate(selectedJSON) {
    var hdnUserID = $("#hdnUserID").val();
    var supervisorJSON = JSON.parse(selectedJSON);
    var supervisor = supervisorJSON != undefined && supervisorJSON != null && supervisorJSON[0] != undefined ? supervisorJSON[0].UserID : '';

    if (hdnUserID === supervisor) {
        xmlForm.showControl("CompletionDate", "ROWProjectAssignment");
    } else {
        xmlForm.hideControl("CompletionDate", "ROWProjectAssignment");
        xmlForm.setControlValue("CompletionDate", "ROWProjectAssignment", null)
    }
}
function WFArchiveValidation(ActionName, RouteTo) {
    if (confirm("Are you sure you want to archive the Project? Archived projects cannot be reactivated.")) {
        return true;
    }
    else {
        return false;
    }
};
$(document).ready(function () {
    var currentRoles = $("#currentUserRoles").val();
    var split_currentRoles = currentRoles.split(",");
    if (!(ValidateAssignor(split_currentRoles)) && !(ValidateAssignee(split_currentRoles))) {
        HideAllButtons()
    }
    else if (ValidateAssignee(split_currentRoles) && !(ValidateAssignor(split_currentRoles))) {
        HideAddDelete()
    }
});
function HideAllButtons() {
    $('[formdesignername="AgentAssignmentGrid"]').find('table').last().find('input[value="Delete"]').hide();
    $('[formdesignername="AgentAssignmentGrid"]').find('table').last().find('input[value="Add"]').hide();
    $('[formdesignername="AgentAssignmentGrid"]').find('table').last().find('input[value="Edit"]').hide();
    var btnsave = document.getElementById("lnkSave");
    if (btnsave != null) {
        btnsave.disabled = true;
    }
}
function HideAddDelete() {
    $('[formdesignername="AgentAssignmentGrid"]').find('table').last().find('input[value="Delete"]').hide();
    $('[formdesignername="AgentAssignmentGrid"]').find('table').last().find('input[value="Add"]').hide();
}

function BeforeRowAddScript() {
    var currentRoles = $("#currentUserRoles").val();
    var split_currentRoles = currentRoles.split(",");
    if (ValidateAssignor(split_currentRoles)) {
        xmlForm.enableControl("NDOTParcelNumber", "AgentAssignmentGrid");
        xmlForm.enableControl("DueDate", "AgentAssignmentGrid");
        xmlForm.enableControl("CompletionDate", "AgentAssignmentGrid");
        xmlForm.enableControl("Status", "AgentAssignmentGrid");
        xmlForm.enableControl("Comments", "AgentAssignmentGrid");
        $("#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker").removeAttr('disabled');
        $("#C1_Assignee_AssigneePicker_btnShowPicker").removeAttr('disabled');
    }
    else {
        xmlForm.disableControl("NDOTParcelNumber", "AgentAssignmentGrid");
        xmlForm.disableControl("DueDate", "AgentAssignmentGrid");
        xmlForm.hideControl("CompletionDate", "AgentAssignmentGrid");
        xmlForm.disableControl("Status", "AgentAssignmentGrid");
        xmlForm.disableControl("Comments", "AgentAssignmentGrid");
        $("#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker").attr('disabled', true);
        $("#C1_Assignee_AssigneePicker_btnShowPicker").attr('disabled', true);
    }
    if (ValidateAssignee(split_currentRoles)) {
        xmlForm.showControl("CompletionDate", "AgentAssignmentGrid");
    }
}

function BeforeRowEditScript(gridId, selectedRow) {
    var mastertable = $find(gridId).get_masterTableView();
    var assignor = mastertable.getCellByColumnUniqueName(selectedRow, "Assignor").innerHTML.replace(/&nbsp;/g, "").replace(/\s+/g, '');
    var assignee = mastertable.getCellByColumnUniqueName(selectedRow, "AssigneeName").innerHTML.replace(/&nbsp;/g, "").replace(/\s+/g, '');
    var currentRoles = $("#currentUserRoles").val();
    var split_currentRoles = currentRoles.split(",");
    var currentUserName = xmlForm.getControlValue("AUR_ModifiedBy");
    var parcelGroup = mastertable.getCellByColumnUniqueName(selectedRow, "ParcelGroup").innerHTML.replace(/&nbsp;/g, "");
    var parcelNumber = mastertable.getCellByColumnUniqueName(selectedRow, "NDOTParcelNumber").innerHTML.replace(/&nbsp;/g, "");

    if (ValidateAssignor(split_currentRoles)) {
        xmlForm.enableControl("NDOTParcelNumber", "AgentAssignmentGrid");
        xmlForm.enableControl("DueDate", "AgentAssignmentGrid");
        xmlForm.enableControl("CompletionDate", "AgentAssignmentGrid");
        xmlForm.enableControl("Status", "AgentAssignmentGrid");
        xmlForm.enableControl("Comments", "AgentAssignmentGrid");
        $("#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker").removeAttr('disabled');
        $("#C1_Assignee_AssigneePicker_btnShowPicker").removeAttr('disabled');

        if (parcelGroup != '') {
            $('#C1_NDOTParcelNumberCtrl_NDOTParcelNumberPicker_btnShowPicker').attr('disabled', true);
            $('#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker').removeAttr('disabled');
        }

        if (parcelNumber != '') {
            $('#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker').attr('disabled', true);
            $('#C1_NDOTParcelNumberCtrl_NDOTParcelNumberPicker_btnShowPicker').removeAttr('disabled');

        }
    }
    else if (ValidateAssignee(split_currentRoles) && assignee == currentUserName.replace(/\s+/g, '')) {
        xmlForm.disableControl("Section", "AgentAssignmentGrid");
        xmlForm.disableControl("NDOTParcelNumber", "AgentAssignmentGrid");
        xmlForm.disableControl("DueDate", "AgentAssignmentGrid");
        xmlForm.showControl("CompletionDate", "AgentAssignmentGrid");
        xmlForm.enableControl("Status", "AgentAssignmentGrid");
        xmlForm.enableControl("Comments", "AgentAssignmentGrid");
        $("#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker").attr('disabled', true);
        $("#C1_Assignee_AssigneePicker_btnShowPicker").attr('disabled', true);
        $("#C1_NDOTParcelNumberCtrl_NDOTParcelNumberPicker_btnShowPicker").attr('disabled', true);
    }
    else {
        xmlForm.disableControl("Section", "AgentAssignmentGrid");
        xmlForm.disableControl("NDOTParcelNumber", "AgentAssignmentGrid");
        xmlForm.disableControl("DueDate", "AgentAssignmentGrid");
        xmlForm.hideControl("CompletionDate", "AgentAssignmentGrid");
        xmlForm.disableControl("Status", "AgentAssignmentGrid");
        xmlForm.disableControl("Comments", "AgentAssignmentGrid");
        $("#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker").attr('disabled', true);
        $("#C1_Assignee_AssigneePicker_btnShowPicker").attr('disabled', true);
        $("#C1_NDOTParcelNumberCtrl_NDOTParcelNumberPicker_btnShowPicker").attr('disabled', true);
    }

    if (ValidateAssignee(split_currentRoles) && assignee == currentUserName.replace(/\s+/g, '')) {
        xmlForm.showControl("CompletionDate", "AgentAssignmentGrid");
    }

    if (assignor == assignee && assignee == currentUserName.replace(/\s+/g, '')) {
        xmlForm.showControl("CompletionDate", "AgentAssignmentGrid");
    }

    if (assignee == currentUserName.replace(/\s+/g, '')) {
        xmlForm.showControl("CompletionDate", "AgentAssignmentGrid");
    }

    return true;
}

function ValidateAssignor(split_currentRoles) {
    return split_currentRoles.includes("Administrator") ||
        split_currentRoles.includes("ROW Suprv Appraisal") ||
        split_currentRoles.includes("ROW Suprv Acquisition") ||
        split_currentRoles.includes("ROW Suprv Utilities") ||
        split_currentRoles.includes("ROW Supervisor SS") ||
        split_currentRoles.includes("ROW Engineering Tech V SS") ||
        split_currentRoles.includes("ROW Suprv Property Management") ||
        split_currentRoles.includes("ROW Chief") ||
        split_currentRoles.includes("ROW Deputy Chief") ||
        split_currentRoles.includes("ROW Assistant Chief Acquisition") ||
        split_currentRoles.includes("ROW Assistant Chief Adm") ||
        split_currentRoles.includes("ROW Assistant Chief Utilities");

}
function ValidateAssignee(split_currentRoles) {
    return split_currentRoles.includes("ROW Engineering Tech 4 SS") ||
        split_currentRoles.includes("ROW Engineering Tech 1-3 SS") ||
        split_currentRoles.includes("ROW Agent Acquisition") ||
        split_currentRoles.includes("ROW Agent Utility") ||
        split_currentRoles.includes("ROW Agent Relocation") ||
        split_currentRoles.includes("ROW Agent Property Management") ||
        split_currentRoles.includes("ROW Control") ||
        split_currentRoles.includes("ROW Staff Specialist") ||
        split_currentRoles.includes("ROW Appraiser") ||
        split_currentRoles.includes("ROW Appraiser Reviewer");
}

function GetParcelGrpDetails() {
    var parcelGrp = $('#AgentAssignmentGrid_ParcelGroup_Id')[0].value;
    if (parcelGrp != undefined) {
        $.ajax({
            type: "GET",
            url: '/api/NDOTIRWINStaffAssignment/StaffAssignmentParcelGroupPropOwners?parcelGrp=' + parcelGrp,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    if (data.Table.length > 0)
                        $('#AgentAssignmentGrid_PropertyOwner_Id')[0].value = data.Table[0].PropertyOwner;
                }
            },

            error: function (e) {
                console.log(e.message);
            }
        });
        $('#C1_NDOTParcelNumberCtrl_NDOTParcelNumberPicker_btnShowPicker').attr('disabled', true);
        return false;
    }

}

function GetParcelNumDetails() {
    var parcelNumber = $('#AgentAssignmentGrid_NDOTParcelNumber_Id')[0].value;

    if (parcelNumber != undefined) {
        $.ajax({
            type: "GET",
            url: '/api/NDOTIRWINStaffAssignment/StaffAssignmentParcelNumberPropOwners?parcelNumber=' + parcelNumber,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    if (data.Table.length > 0)
                        $('#AgentAssignmentGrid_PropertyOwner_Id')[0].value = data.Table[0].PropertyOwner;
                }
                $('#C1_ParcelGroupCtrl_ParcelGroupPicker_btnShowPicker').attr('disabled', true);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
        return false;
    }
}

function FilterByParcelGroup(pickerName, columnName, gridId, keyColumn, filterJSON) {
    let ds = xmlForm.DynamicGrid.getGridData("AgentAssignmentGrid");
    var existingParcelGroups = ds.map(row => row["ParcelGroup"]);
    var filter = JSON.parse(filterJSON);
    var cond = "GroupName NOT IN ('" + existingParcelGroups.join("','") + "')";
    if (filter.Filter && filter.Filter.length > 0) {
        filter.Filter += " AND " + cond;
    } else {
        filter.Filter = cond;
    }
    return filter;
}



function FilterByParcelNumber(pickerName, columnName, gridId, keyColumn, filterJSON) {
    let ds = xmlForm.DynamicGrid.getGridData("AgentAssignmentGrid");
    var existingParcelNumbers = ds.map(row => row["NDOTParcelNumber"]);
    var filter = JSON.parse(filterJSON);
    var cond = "NDOTParcelNumber NOT IN ('" + existingParcelNumbers.join("','") + "')";
    if (filter.Filter && filter.Filter.length > 0) {
        filter.Filter += " AND " + cond;
    } else {
        filter.Filter = cond;
    }
    return filter;
}
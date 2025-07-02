$(document).ready(function () {

    $('[formdesignername="NoOfFurnishedRooms"] input[type="Text"]').blur(() => {
        setTotalNoOfRooms();
    });

    $('[formdesignername="NoOfUnfurnishedRooms"] input[type="Text"]').blur(() => {
        setTotalNoOfRooms();
    });

});

function setTotalNoOfRooms() {
    var FurnishedRooms = parseInt(xmlForm.getControlValue('NoOfFurnishedRooms')) || 0;
    var UnfurnishedRooms = parseInt(xmlForm.getControlValue('NoOfUnfurnishedRooms')) || 0;
    var TotalRooms = FurnishedRooms + UnfurnishedRooms;
    xmlForm.setControlValue('TotalNoOfRooms', '', TotalRooms);
}

function setMRETotalAmount() {
    var TotalAmount = 0.00;
    var MREgrid = $find($("div[dynamicgridreference='MovingAndRelatedExpenses']").attr('id'));
    if (MREgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < MREgrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(MREgrid.MasterTableView.getCellByColumnUniqueName(MREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText) != '') {
                TotalAmount += parseDecimals(MREgrid.MasterTableView.getCellByColumnUniqueName(MREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText.replace(/\,/g, ''));
            }
        }
    }
    xmlForm.setControlValue('MRETotalAmount', '', TotalAmount);
}

function setSRETotalAmount() {
    var TotalAmount = 0.00;
    var SREgrid = $find($("div[dynamicgridreference='StorageAndRelatedExpenses']").attr('id'));
    if (SREgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < SREgrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(SREgrid.MasterTableView.getCellByColumnUniqueName(SREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText) != '') {
                TotalAmount += parseDecimals(SREgrid.MasterTableView.getCellByColumnUniqueName(SREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText.replace(/\,/g, ''));
            }
        }
    }
    xmlForm.setControlValue('SRETotalAmount', '', TotalAmount);
}
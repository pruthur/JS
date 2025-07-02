$(document).ready(function () {

    $('[formdesignername="TaxReturnYear1"] input[type="Text"]').blur(() => {
        calculateTaxReturnTotals();
    });

    $('[formdesignername="TaxReturnYear2"] input[type="Text"]').blur(() => {
        calculateTaxReturnTotals();
    });

    calculateTaxReturnTotals();
});

function calculateTaxReturnTotals() {
    var taxYear1 = parseFloat(xmlForm.getControlValue('TaxReturnYear1')) || 0.00;
    var taxYear2 = parseFloat(xmlForm.getControlValue('TaxReturnYear2')) || 0.00;
    
    var totalNetEarnings = taxYear1 + taxYear2;
    xmlForm.setControlValue('TotalNetEarnings', '', totalNetEarnings.toFixed(2));
    
    var averageAnnualNetEarnings = totalNetEarnings / 2;
    xmlForm.setControlValue('AverageAnnualNetEarnings', '', averageAnnualNetEarnings.toFixed(2));
}

function setMRETotalAmount() {
    var TotalAmount = 0.00;
    var MREgrid = $find($("div[dynamicgridreference='MovingAndRelatedExpensesNR']").attr('id'));
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
    var SREgrid = $find($("div[dynamicgridreference='StorageAndRelatedExpensesNR']").attr('id'));
    if (SREgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < SREgrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(SREgrid.MasterTableView.getCellByColumnUniqueName(SREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText) != '') {
                TotalAmount += parseDecimals(SREgrid.MasterTableView.getCellByColumnUniqueName(SREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText.replace(/\,/g, ''));
            }
        }
    }
    xmlForm.setControlValue('SRETotalAmount', '', TotalAmount);
}

function setRRETotalAmount() {
    var TotalAmount = 0.00;
    var RREgrid = $find($("div[dynamicgridreference='ReestablishmentAndRelatedExpenses']").attr('id'));
    if (RREgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < RREgrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(RREgrid.MasterTableView.getCellByColumnUniqueName(RREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText) != '') {
                TotalAmount += parseDecimals(RREgrid.MasterTableView.getCellByColumnUniqueName(RREgrid.MasterTableView.get_dataItems()[i], "Amount").innerText.replace(/\,/g, ''));
            }
        }
    }
    xmlForm.setControlValue('RRETotalAmount', '', TotalAmount);
}
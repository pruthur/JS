$(document).ready(function () {

    $('[formdesignername="MonthlyIncome"] input[type="Text"]').blur(() => {
        setTotalMonthlyHouseholdIncome();
    });

    $('[formdesignername="Mortgage"] input[type="Text"]').blur(() => {
        setOwnerTotalMonthlyExpenditures();
    });

    $('[formdesignername="OwnerUtilities"] input[type="Text"]').blur(() => {
        setOwnerTotalMonthlyExpenditures();
    });

    $('[formdesignername="Rent"] input[type="Text"]').blur(() => {
        setTenantTotalMonthlyExpenditures();
    });

    $('[formdesignername="TenantUtilities"] input[type="Text"]').blur(() => {
        setTenantTotalMonthlyExpenditures();
    });

    $('[formdesignername="UtilitiesIncludedinRent"] input[type="Text"]').blur(() => {
        setTenantTotalMonthlyExpenditures();
    });
});

function setTotalMonthlyHouseholdIncome() {
    var AdditionalMonthlyIncome = 0.00;
    var AdditionalDisplaceesGrid = $find($("div[dynamicgridreference='AdditionalDisplacees']").attr('id'));
    if (AdditionalDisplaceesGrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < AdditionalDisplaceesGrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(AdditionalDisplaceesGrid.MasterTableView.getCellByColumnUniqueName(AdditionalDisplaceesGrid.MasterTableView.get_dataItems()[i], "AdditionalMonthlyIncome").innerText) != '') {
                AdditionalMonthlyIncome += parseFloat(AdditionalDisplaceesGrid.MasterTableView.getCellByColumnUniqueName(AdditionalDisplaceesGrid.MasterTableView.get_dataItems()[i], "AdditionalMonthlyIncome").innerText.replace(/\,/g, ''));
            }
        }
    }
    var MonthlyIncome = parseFloat(xmlForm.getControlValue('MonthlyIncome')) || 0.00;
    var TtlMonthlyHouseholdIncome = MonthlyIncome + AdditionalMonthlyIncome;
    xmlForm.setControlValue('TtlMonthlyHouseholdIncome', '', Number(TtlMonthlyHouseholdIncome).toFixed(2));
}

function setOwnerTotalMonthlyExpenditures() {
    var Mortgage = parseFloat(xmlForm.getControlValue('Mortgage')) || 0.00;
    var OwnerUtilities = parseFloat(xmlForm.getControlValue('OwnerUtilities')) || 0.00;
    var OwnerTotalMonthlyExpenditures = Mortgage + OwnerUtilities;
    xmlForm.setControlValue('OwnerTotalMonthlyExpenditures', '', OwnerTotalMonthlyExpenditures);
}

function setTenantTotalMonthlyExpenditures() {
    var Rent = parseFloat(xmlForm.getControlValue('Rent')) || 0.00;
    var TenantUtilities = parseFloat(xmlForm.getControlValue('TenantUtilities')) || 0.00;
    var UtilitiesIncludedinRent = parseFloat(xmlForm.getControlValue('UtilitiesIncludedinRent')) || 0.00;
    var Total = Rent + TenantUtilities;
    var TenantTotalMonthlyExpenditures = Total - UtilitiesIncludedinRent;
    xmlForm.setControlValue('Total', '', Total);
    xmlForm.setControlValue('TenantTotalMonthlyExpenditures', '', TenantTotalMonthlyExpenditures);
}
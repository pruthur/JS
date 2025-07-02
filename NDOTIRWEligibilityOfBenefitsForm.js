$(document).ready(function () {
  
    OnRadioButtonChange();

    $('[formdesignername="PriceDifferentialSupplementalPayment"] input[type="Text"]').blur(() => {
        if (xmlForm.getControlValue('PriceDifferentialSupplementalPayment') > 41200) {
            xmlForm.setControlValue('PriceDifferentialSupplementalPayment', '', 0);
        }
        setTotalEntitlementOwnerOccuGreaterThan90();
    });

    $('[formdesignername="LastResortHousingPayment"] input[type="Text"]').blur(() => {
        setTotalEntitlementOwnerOccuGreaterThan90();
    });

    $('[formdesignername="OwnerRentDifferential"] input[type="Text"]').blur(() => {
        let Owner42MonthsRD = parseFloat(42 * xmlForm.getControlValue('OwnerRentDifferential')) || 0;
        xmlForm.setControlValue('Owner42MonthsRD', '', Owner42MonthsRD);
    });

    $('[formdesignername="CRTenantRentalAmount"] input[type="Text"]').blur(() => {
        setTenantRentalSupplement();
    });

    $('[formdesignername="CRAverageMonthlyUtilities"] input[type="Text"]').blur(() => {
        setTenantRentalSupplement();
    });

    $('[formdesignername="ACurrentMonthlyRent"] input[type="Text"]').blur(() => {
        setABaseMonthlyRent();
    });

    $('[formdesignername="AUtilities"] input[type="Text"]').blur(() => {
        setABaseMonthlyRent();
    });

    $('[formdesignername="BFairMarketRent"] input[type="Text"]').blur(() => {
        setBBaseMonthlyRent();
    });

    $('[formdesignername="BUtilities"] input[type="Text"]').blur(() => {
        setBBaseMonthlyRent();
    });

    $('[formdesignername="CGrossMonthlyIncome"] input[type="Text"]').blur(() => {
        setCBaseMonthlyRent();
    });

    $('[formdesignername="RentDifferential"] input[type="Text"]').blur(() => {
        let FortyTwoMonthsRD = parseFloat(42 * xmlForm.getControlValue('RentDifferential'));
        xmlForm.setControlValue('42MonthsRD', '', FortyTwoMonthsRD);

        let RDGreaterThan9570 = parseFloat(FortyTwoMonthsRD - 9570);
        if (RDGreaterThan9570 < 0) RDGreaterThan9570 = 0;
        xmlForm.setControlValue('RDGreaterThan9570', '', RDGreaterThan9570);

        let TotalEntitlement = parseFloat(FortyTwoMonthsRD + RDGreaterThan9570);
        xmlForm.setControlValue('TenantTotalEntitlement', '', TotalEntitlement);
    });

});

function OnRadioButtonChange() {
    var PurchaseSupplement = document.getElementById('ELIGBNF_EligibilityOfBenefits_Id_0');
    var OwnerRentalAssistance = document.getElementById('ELIGBNF_EligibilityOfBenefits_Id_1');
    var TenantRentalAssistance = document.getElementById('ELIGBNF_EligibilityOfBenefits_Id_2');

    if (PurchaseSupplement.checked) {
        PurchaseSupplementEnableControl();
        OwnerRentalAssistanceDisableControl();
        TenantRentalAssistanceDisableControl();
    }
    else if (OwnerRentalAssistance.checked) {
        PurchaseSupplementDisableControl();
        OwnerRentalAssistanceEnableControl();
        TenantRentalAssistanceDisableControl();
    }
    else if (TenantRentalAssistance.checked) {
        PurchaseSupplementDisableControl();
        OwnerRentalAssistanceDisableControl();
        TenantRentalAssistanceEnableControl();
    }
    else {
        // If none are checked, disable all sections
        PurchaseSupplementDisableControl();
        OwnerRentalAssistanceDisableControl();
        TenantRentalAssistanceDisableControl();
    }
    PurchaseSupplement.onclick = function () {
        PurchaseSupplementEnableControl();
        OwnerRentalAssistanceDisableControl();
        TenantRentalAssistanceDisableControl();
    }

    OwnerRentalAssistance.onclick = function () {
        PurchaseSupplementDisableControl();
        OwnerRentalAssistanceEnableControl();
        TenantRentalAssistanceDisableControl();
    }

    TenantRentalAssistance.onclick = function () {
        PurchaseSupplementDisableControl();
        OwnerRentalAssistanceDisableControl();
        TenantRentalAssistanceEnableControl();
    }
}

function PurchaseSupplementEnableControl() {
    xmlForm.enableControl('AdjustedPriceofCRH');
    xmlForm.enableControl('PurchasePrice');
    xmlForm.enableControl('PriceDifferentialSupplementalPayment');
    xmlForm.enableControl('LastResortHousingPayment');
    xmlForm.enableControl('TotalEntitlement');
}
function PurchaseSupplementDisableControl() {
    xmlForm.disableControl('AdjustedPriceofCRH');
    xmlForm.disableControl('PurchasePrice');
    xmlForm.disableControl('PriceDifferentialSupplementalPayment');
    xmlForm.disableControl('LastResortHousingPayment');
    xmlForm.disableControl('TotalEntitlement');

    xmlForm.setControlValue('AdjustedPriceofCRH', '', 0);
    xmlForm.setControlValue('PurchasePrice', '', 0);
    xmlForm.setControlValue('PriceDifferentialSupplementalPayment', 0);
    xmlForm.setControlValue('LastResortHousingPayment', '', 0);
    xmlForm.setControlValue('TotalEntitlement', '', 0);
}

function OwnerRentalAssistanceEnableControl() {
    xmlForm.enableControl('CROwnerRentalAmount');
    xmlForm.enableControl('FairMarketRent');
    xmlForm.enableControl('OwnerRentDifferential');
    xmlForm.enableControl('Owner42MonthsRD');
    xmlForm.enableControl('OwnerTotalEntitlement');
}

function OwnerRentalAssistanceDisableControl() {
    xmlForm.disableControl('CROwnerRentalAmount');
    xmlForm.disableControl('FairMarketRent');
    xmlForm.disableControl('OwnerRentDifferential');
    xmlForm.disableControl('Owner42MonthsRD');
    xmlForm.disableControl('OwnerTotalEntitlement');

    xmlForm.setControlValue('CROwnerRentalAmount', '', 0);
    xmlForm.setControlValue('FairMarketRent', '', 0);
    xmlForm.setControlValue('OwnerRentDifferential', '', 0);
    xmlForm.setControlValue('Owner42MonthsRD', '', 0);
    xmlForm.setControlValue('OwnerTotalEntitlement', '', 0);
}

function TenantRentalAssistanceEnableControl() {
    xmlForm.enableControl('CRTenantRentalAmount');
    xmlForm.enableControl('CRAverageMonthlyUtilities');
    xmlForm.enableControl('TenantRentalSupplement');
}

function TenantRentalAssistanceDisableControl() {
    xmlForm.disableControl('CRTenantRentalAmount');
    xmlForm.disableControl('CRAverageMonthlyUtilities');
    xmlForm.disableControl('TenantRentalSupplement');

    xmlForm.setControlValue('CRTenantRentalAmount', '', 0);
    xmlForm.setControlValue('CRAverageMonthlyUtilities', '', 0);
    xmlForm.setControlValue('TenantRentalSupplement', '', 0);
}

function setTotalEntitlementOwnerOccuGreaterThan90() {
    let TotalEntitlement = (parseFloat(xmlForm.getControlValue('PriceDifferentialSupplementalPayment')) || 0) + (parseFloat(xmlForm.getControlValue('LastResortHousingPayment')) || 0);
    TotalEntitlement = parseFloat(TotalEntitlement.toFixed(2));
    xmlForm.setControlValue('TotalEntitlement', '', TotalEntitlement);
}

function setTenantRentalSupplement() {
    let TenantRentalSupplement = (parseFloat(xmlForm.getControlValue('CRTenantRentalAmount')) || 0) + (parseFloat(xmlForm.getControlValue('CRAverageMonthlyUtilities')) || 0);
    xmlForm.setControlValue('TenantRentalSupplement', '', TenantRentalSupplement);
}

function setABaseMonthlyRent() {
    let ABaseMonthlyRent = (parseFloat(xmlForm.getControlValue('ACurrentMonthlyRent')) || 0) + (parseFloat(xmlForm.getControlValue('AUtilities')) || 0);
    xmlForm.setControlValue('ABaseMonthlyRent', '', ABaseMonthlyRent);
    setBaseMonthlyRent();
}

function setBBaseMonthlyRent() {
    let BBaseMonthlyRent = (parseFloat(xmlForm.getControlValue('BFairMarketRent')) || 0) + (parseFloat(xmlForm.getControlValue('BUtilities')) || 0);
    xmlForm.setControlValue('BBaseMonthlyRent', '', BBaseMonthlyRent);
    setBaseMonthlyRent();
}

function setCBaseMonthlyRent() {
    var CGrossMonthlyIncome = xmlForm.getControlValue('CGrossMonthlyIncome') || 0;
    var CFinancialMeans = parseFloat(xmlForm.getControlValue('CFinancialMeans'));
    var CBaseMonthlyRent = (CGrossMonthlyIncome * CFinancialMeans);
    xmlForm.setControlValue('CBaseMonthlyRent', '', CBaseMonthlyRent);
    setBaseMonthlyRent();
}

function setBaseMonthlyRent() {
    var A = parseFloat(xmlForm.getControlValue('ABaseMonthlyRent')) || 0;
    var B = parseFloat(xmlForm.getControlValue('BBaseMonthlyRent')) || 0;
    var C = parseFloat(xmlForm.getControlValue('CBaseMonthlyRent')) || 0;
    var validRent = [A, B, C].filter(rent => rent > 0);
    if (validRent.length == 0) {
        xmlForm.setControlValue('BaseMonthlyRent', '', 0);
    }
    if (validRent.length > 0) {
        var MinimumRent = parseFloat(Math.min(...validRent));
        xmlForm.setControlValue('BaseMonthlyRent', '', MinimumRent);
    }
}
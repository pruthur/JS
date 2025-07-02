$(document).ready(function () {

    if (xmlForm.getControlValue('ParcelGrp') != '') {
        SetAssociatedAppraisalURL();
    }
    $('[formdesignername="FinalAwardAmount"] input[type="text"]').blur(() => {
        setGrandTotal();
    });

    $('[formdesignername="TotalLandImprovJC"] input[type="text"]').blur(() => {
        var offerJustCompensation = parseFloat(xmlForm.getControlValue('TotalLandImprovJC')) + parseFloat(xmlForm.getControlValue('JCAmount'))
        xmlForm.setControlValue('OfferJustCompensation', '', offerJustCompensation);
        xmlForm.setControlValue('JCAmountWaiverVal', "", xmlForm.getControlValue('TotalLandImprovJC'));
        setGrandTotal();
    });

    $('[formdesignername="ClosingCosts"] input[type="text"]').blur(() => {
        setGrandTotal();
    });


    let dropdownid = "#" + $("[id$='ACQUSTN_AgreementBasedTransfer_Id']").attr('id');
    let currentval = $(dropdownid + " option:selected").text();

    if (currentval == "LPA Transfer" || currentval == "Private Party Transfer") {
        xmlForm.showControl("AgreementExpirationDate");
    }
    else {
        xmlForm.hideControl("AgreementExpirationDate");
    }

    $(dropdownid).change(function () {
        let currentdropdownid = "#" + $("[id$='ACQUSTN_AgreementBasedTransfer_Id']").attr('id');
        let currentselectedval = $(currentdropdownid + " option:selected").text();

        if (currentselectedval == "LPA Transfer" || currentselectedval == "Private Party Transfer") {
            xmlForm.showControl("AgreementExpirationDate");
            xmlForm.setControlValue("AgreementExpirationDate", '', null);
        }
        else {
            xmlForm.hideControl("AgreementExpirationDate");
            xmlForm.setControlValue("AgreementExpirationDate", '', null);
        }
    });

    if (xmlForm.getControlValue('WaiverValuation') == 'No') {
        xmlForm.hideContainer("WaiverValuationTab");
    }

    if (xmlForm.getControlValue("FormCurrentStatus") == "Acquired") {
        DisableDynamicGridsEdit();
    }

    if (xmlForm.getControlValue('ParcelGrp') != '') {
        xmlForm.disableControl("ParcelGrpTrigger");
    }

});

function formatAmount(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function BindPropertyOwnerDynamicGrid() {
    let parcelGrp = xmlForm.getControlValue('ParcelGrp');
    xmlForm.disableControl("ParcelGrpTrigger");
    ClearWaiverValuationTabGrids();
    if (parcelGrp != undefined) {
        $.ajax({
            type: "GET",
            url: '/api/NDOTIRWINAcquisition/AcquisitionParcelGroupDetails?parcelGrp=' + parcelGrp,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    let instanceId = data.Table[0]['ID'];
                    let parentId = data.Table[0]['ParentID'];
                    let associatedAppraisalID = data.Table[0]['AppraisalID'];
                    let waiverValuation = data.Table[0]['WaiverValuation'];
                    let justComp = data.Table[0]['JustComp'];

                    let url = "/Default.aspx#/Common/BrixForm.aspx?Context=APPRASL&PID=0" + "&ParentID=" + parentId + "&Mode=View&InstanceID=" + instanceId;
                    let hyperlink = '<a href="' + url + '" target="_blank">' + associatedAppraisalID + '</a>';
                    xmlForm.setControlValue("AssociatedAppraisal", "", associatedAppraisalID);
                    $("#ACQUSTN_AssociatedAppraisal_Id_Text").html(hyperlink);

                    xmlForm.setControlValue('WaiverValuation', "", waiverValuation);
                    if (xmlForm.getControlValue('WaiverValuation') == 'No') {
                        xmlForm.hideContainer("WaiverValuationTab");
                    }
                    xmlForm.DynamicGrid.bindGridRows("AcqPropertyOwnerDG", data.Table1);
                    xmlForm.setControlValue('JCAmount', "", justComp);
                    xmlForm.setControlValue('JCAmountWaiverVal', "", xmlForm.getControlValue('TotalLandImprovJC'));
                    let OfferJustCompensation = parseFloat(xmlForm.getControlValue('TotalLandImprovJC')) + (isNaN(parseFloat(justComp)) ? 0 : parseFloat(justComp));
                    xmlForm.setControlValue('OfferJustCompensation', "", OfferJustCompensation);
                    setGrandTotal();
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
    return false;
}

function FilterByParcelGroupNameFeeParcels(pickerName, columnName, gridId, keyColumn, filterJSON) {
    var GroupName = xmlForm.getControlValue('ParcelGrp');
    var filter = JSON.parse(filterJSON);
    var cond = "GroupName = '" + GroupName + "' AND ParcelSubType != 'TE'";
    if (filter.Filter && filter.Filter.length > 0) {
        filter.Filter += " AND " + cond;
    } else {
        filter.Filter = cond;
    }
    return filter;
}

function FilterByAcquisitionFeeParcels(pickerName, columnName, gridId, keyColumn, filterJSON) {
    var parcelNumberarrayFilter = FeeParcelFilter();
    if (parcelNumberarrayFilter.length === 0) {
        let filter = JSON.parse(filterJSON);
        filter.Filter = "1=0";
        return filter;
    }
    else {
        var conditions = parcelNumberarrayFilter.map(number => `'${number}'`).join(", ");
        let filter = JSON.parse(filterJSON);
        var cond = "NDOTParcelNumber IN (" + conditions + ")";

        if (filter.Filter && filter.Filter.length > 0) {
            filter.Filter += " AND " + cond;
        } else {
            filter.Filter = cond;
        }
        return filter;
    }
}
function FeeParcelFilter() {
    var feeParcelNumberarray = [];
    var AcquisitionFeeParcelsgrid = $find($("div[dynamicgridreference='AcquisitionFeeParcels']").attr('id'));
    if (AcquisitionFeeParcelsgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < AcquisitionFeeParcelsgrid.MasterTableView.get_dataItems().length; i++) {
            var FeeParcelNo = $.trim($.trim(AcquisitionFeeParcelsgrid.MasterTableView.getCellByColumnUniqueName(AcquisitionFeeParcelsgrid.MasterTableView.get_dataItems()[i], "AcquisitionFeeParcelNo").innerText));
            feeParcelNumberarray.push(FeeParcelNo);
        }
        return feeParcelNumberarray;
    }
    return feeParcelNumberarray
}

function FilterByParcelGroupNameTEParcels(pickerName, columnName, gridId, keyColumn, filterJSON) {
    var GroupName = xmlForm.getControlValue('ParcelGrp')
    var filter = JSON.parse(filterJSON);
    var cond = "GroupName = '" + GroupName + "'";
    if (filter.Filter && filter.Filter.length > 0) {
        filter.Filter += " AND " + cond;
    } else {
        filter.Filter = cond;
    }
    return filter;
}

function TEParcelFilter() {
    var teParcelNumberarray = [];
    var AcquisitionTEParcelsgrid = $find($("div[dynamicgridreference='AcquisitionTEParcels']").attr('id'));
    if (AcquisitionTEParcelsgrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < AcquisitionTEParcelsgrid.MasterTableView.get_dataItems().length; i++) {

            var TEParcelNo = $.trim($.trim(AcquisitionTEParcelsgrid.MasterTableView.getCellByColumnUniqueName(AcquisitionTEParcelsgrid.MasterTableView.get_dataItems()[i], "TEParcelNo").innerText));
            teParcelNumberarray.push(TEParcelNo);
        }
        return teParcelNumberarray;
    }
    return teParcelNumberarray
}

function FilterByTEParcelNo(pickerName, columnName, gridId, keyColumn, filterJSON) {
    var parcelNumberarrayFilter = TEParcelFilter();
    if (parcelNumberarrayFilter.length === 0) {
        let filter = JSON.parse(filterJSON);
        filter.Filter = "1=0";
        return filter;
    }
    else {
        var conditions = parcelNumberarrayFilter.map(number => `'${number}'`).join(", ");
        let filter = JSON.parse(filterJSON);
        var cond = "NDOTParcelNumber IN (" + conditions + ")";

        if (filter.Filter && filter.Filter.length > 0) {
            filter.Filter += " AND " + cond;
        } else {
            filter.Filter = cond;
        }
        filter.OrderBy = "NDOTParcelNumber"
        return filter;
    }
}

function AfterRowUpdate_AdministrativeSettlement(gridID) {
    let ds = xmlForm.DynamicGrid.getGridData("AcquistionOwnerCounterOfferGrid");
    let administrativeSettlementAmount = ds[ds.length - 1]['AdministrativeSettlementAmount'];
    xmlForm.setControlValue('AdministrativeSettlement', '', administrativeSettlementAmount)
    setGrandTotal();
}

function AfterRowDelete_AdministrativeSettlement(gridID) {
    let ds = xmlForm.DynamicGrid.getGridData("AcquistionOwnerCounterOfferGrid");

    if (ds.length === 0) {
        xmlForm.setControlValue('AdministrativeSettlement', '', '0.00');
        setGrandTotal();
    }
    else {
        let administrativeSettlementAmount = ds[ds.length - 1]['AdministrativeSettlementAmount'];
        xmlForm.setControlValue('AdministrativeSettlement', '', administrativeSettlementAmount)
        setGrandTotal();
    }
}

function setGrandTotal() {
    if (xmlForm.getControlValue('FinalAwardAmount') === 0) {
        let gt = parseFloat(xmlForm.getControlValue('JCAmount')) + parseFloat(xmlForm.getControlValue('TotalLandImprovJC')) + parseFloat(xmlForm.getControlValue('AdministrativeSettlement')) + parseFloat(xmlForm.getControlValue('ClosingCosts'))
        xmlForm.setControlValue('GrandTotal', '', gt);
    }
    else {
        xmlForm.setControlValue('GrandTotal', '', parseFloat(xmlForm.getControlValue('FinalAwardAmount')));
    }
}

function ClearWaiverValuationTabGrids() {
    xmlForm.DynamicGrid.bindGridRows('AcquisitionFeeParcels', []);
    xmlForm.DynamicGrid.bindGridRows('AcquisitionFeeParcelImprov', []);
    xmlForm.DynamicGrid.bindGridRows('AcquisitionTEParcels', []);
    xmlForm.DynamicGrid.bindGridRows('AcquisitionTEParcelImprov', []);
    xmlForm.DynamicGrid.bindGridRows('IndParcelComp', []);
    ClearFooterSum();
}

function ClearFooterSum() {
    var AEFGridFooter = $find(xmlForm.DynamicGrid.getGridId("AcquisitionFeeParcels")).get_masterTableViewFooter();
    $(AEFGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[6].textContent = "0.00";

    var AEFImpGridFooter = $find(xmlForm.DynamicGrid.getGridId("AcquisitionFeeParcelImprov")).get_masterTableViewFooter();
    $(AEFImpGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[7].textContent = "0.00";

    var TEPGridFooter = $find(xmlForm.DynamicGrid.getGridId("AcquisitionTEParcels")).get_masterTableViewFooter();
    $(TEPGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[7].textContent = "0.00";

    var TEPImpGridFooter = $find(xmlForm.DynamicGrid.getGridId("AcquisitionTEParcelImprov")).get_masterTableViewFooter();
    $(TEPImpGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[8].textContent = "0.00";

    var IPCGridFooter = $find(xmlForm.DynamicGrid.getGridId("IndParcelComp")).get_masterTableViewFooter();
    $(IPCGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[3].textContent = "0.00";
}

function SetAssociatedAppraisalURL() {
    let parcelGrp = xmlForm.getControlValue('ParcelGrp');
    if (parcelGrp != undefined) {
        $.ajax({
            type: "GET",
            url: '/api/NDOTIRWINAcquisition/AcquisitionParcelGroupDetails?parcelGrp=' + parcelGrp,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    let instanceId = data.Table[0]['ID'];
                    let parentId = data.Table[0]['ParentID'];
                    let associatedAppraisalID = data.Table[0]['AppraisalID'];

                    let url = "/Default.aspx#/Common/BrixForm.aspx?Context=APPRASL&PID=0" + "&ParentID=" + parentId + "&Mode=View&InstanceID=" + instanceId;
                    let hyperlink = '<a href="' + url + '" target="_blank">' + associatedAppraisalID + '</a>';
                    xmlForm.setControlValue("AssociatedAppraisal", "", associatedAppraisalID);
                    $("#ACQUSTN_AssociatedAppraisal_Id_Text").html(hyperlink);
                }
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
};

function DisableDynamicGridsEdit() {
    $($("input[value='Add']")).prop('disabled', 'disabled');
    $($("input[value='Edit']")).prop('disabled', 'disabled');
    $($("input[value='Delete']")).prop('disabled', 'disabled');
};

function UpdateIndParcelCompGridFromFP(strDs, pickerName, ds) {
    xmlForm.DynamicGrid.bindGridRows('IndParcelComp', []);
    var gridData = [];

    var ds2 = xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcelImprov");
    var ds3 = xmlForm.DynamicGrid.getGridData("AcquisitionTEParcels");
    var ds4 = xmlForm.DynamicGrid.getGridData("AcquisitionTEParcelImprov");
    ds.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);

    });

    ds2.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelImprovNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });

    ds3.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });
    ds4.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);

    });

    var groupedData = {};

    gridData.forEach(row => {
        var parcelNo = row.ParcelNo;
        var landImprovements = parseFloat(row.LandImprovements) || 0;

        if (!groupedData[parcelNo]) {
            groupedData[parcelNo] = {
                ParcelNo: parcelNo,
                LandImprovements: "0.00"
            };
        }

        groupedData[parcelNo].LandImprovements = parseFloat(groupedData[parcelNo].LandImprovements) + landImprovements;
        groupedData[parcelNo].LandImprovements = String(groupedData[parcelNo].LandImprovements)
        var result = Object.values(groupedData);
        xmlForm.DynamicGrid.bindGridRows('IndParcelComp', result);
        SetIndParcelCompGridFooterSum();
    });
};

function UpdateIndParcelCompGridFromTEP(strDs, pickerName, ds) {
    xmlForm.DynamicGrid.bindGridRows('IndParcelComp', []);
    var gridData = [];

    var ds2 = xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcels");
    var ds3 = xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcelImprov");
    var ds4 = xmlForm.DynamicGrid.getGridData("AcquisitionTEParcelImprov");

    ds.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);

    });

    ds2.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });

    ds3.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelImprovNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });
    ds4.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);

    });

    var groupedData = {};

    gridData.forEach(row => {
        var parcelNo = row.ParcelNo;
        var landImprovements = parseFloat(row.LandImprovements) || 0;

        if (!groupedData[parcelNo]) {
            groupedData[parcelNo] = {
                ParcelNo: parcelNo,
                LandImprovements: "0.00"
            };
        }

        groupedData[parcelNo].LandImprovements = parseFloat(groupedData[parcelNo].LandImprovements) + landImprovements;
        groupedData[parcelNo].LandImprovements = String(groupedData[parcelNo].LandImprovements)
        var result = Object.values(groupedData);
        xmlForm.DynamicGrid.bindGridRows('IndParcelComp', result);
        SetIndParcelCompGridFooterSum();
    });
};

function ReCalculateIndParcelCompGridOnRowUpdate() {
    var ds1 = $find($("div[dynamicgridreference='AcquisitionFeeParcels']").attr('id')).MasterTableView._dataSource != null ? $find($("div[dynamicgridreference='AcquisitionFeeParcels']").attr('id')).MasterTableView._dataSource : xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcels");
    var ds2 = $find($("div[dynamicgridreference='AcquisitionFeeParcelImprov']").attr('id')).MasterTableView._dataSource != null ? $find($("div[dynamicgridreference='AcquisitionFeeParcelImprov']").attr('id')).MasterTableView._dataSource : xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcelImprov");
    var ds3 = $find($("div[dynamicgridreference='AcquisitionTEParcels']").attr('id')).MasterTableView._dataSource != null ? $find($("div[dynamicgridreference='AcquisitionTEParcels']").attr('id')).MasterTableView._dataSource : xmlForm.DynamicGrid.getGridData("AcquisitionTEParcels");
    var ds4 = $find($("div[dynamicgridreference='AcquisitionTEParcelImprov']").attr('id')).MasterTableView._dataSource != null ? $find($("div[dynamicgridreference='AcquisitionTEParcelImprov']").attr('id')).MasterTableView._dataSource : xmlForm.DynamicGrid.getGridData("AcquisitionTEParcelImprov");
    ReCalculateIndParcelCompGrid(ds1, ds2, ds3, ds4);
};

function ReCalculateIndParcelCompGridOnCellEdit() {
    var ds1 = xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcels");
    var ds2 = xmlForm.DynamicGrid.getGridData("AcquisitionFeeParcelImprov");
    var ds3 = xmlForm.DynamicGrid.getGridData("AcquisitionTEParcels");
    var ds4 = xmlForm.DynamicGrid.getGridData("AcquisitionTEParcelImprov");
    ReCalculateIndParcelCompGrid(ds1, ds2, ds3, ds4);
};


function ReCalculateIndParcelCompGrid(ds1, ds2, ds3, ds4) {
    xmlForm.DynamicGrid.bindGridRows('IndParcelComp', []);

    var gridData = []
    ds1.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });

    ds2.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['AcquisitionFeeParcelImprovNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });

    ds3.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);
    });
    ds4.forEach(function (dataRow) {
        var filteredRow = {
            'ID': '',
            'FID': '',
            'ParcelNo': dataRow['TEParcelNo'],
            'LandImprovements': parseDecimals(String(dataRow['Totals']))
        };
        gridData.push(filteredRow);

    });

    var groupedData = {};

    if (gridData.length > 0) {
        gridData.forEach(row => {
            var parcelNo = row.ParcelNo;
            var landImprovements = parseFloat(row.LandImprovements) || 0;

            if (!groupedData[parcelNo]) {
                groupedData[parcelNo] = {
                    ParcelNo: parcelNo,
                    LandImprovements: "0.00"
                };
            }

            groupedData[parcelNo].LandImprovements = parseFloat(groupedData[parcelNo].LandImprovements) + landImprovements;
            groupedData[parcelNo].LandImprovements = String(groupedData[parcelNo].LandImprovements)
            var result = Object.values(groupedData);
            xmlForm.DynamicGrid.bindGridRows('IndParcelComp', result);
            SetIndParcelCompGridFooterSum();
        });
    }
    else { SetIndParcelCompGridFooterSum(); }
};

function SetIndParcelCompGridFooterSum() {
    var TotalAmount = 0.00;
    var IndParcelCompGrid = $find($("div[dynamicgridreference='IndParcelComp']").attr('id'));
    if (IndParcelCompGrid.MasterTableView.get_dataItems().length > 0) {
        for (var i = 0; i < IndParcelCompGrid.MasterTableView.get_dataItems().length; i++) {
            if ($.trim(IndParcelCompGrid.MasterTableView.getCellByColumnUniqueName(IndParcelCompGrid.MasterTableView.get_dataItems()[i], "LandImprovements").innerText) != '') {
                TotalAmount += parseDecimals(IndParcelCompGrid.MasterTableView.getCellByColumnUniqueName(IndParcelCompGrid.MasterTableView.get_dataItems()[i], "LandImprovements").innerText.replace(/\,/g, ''));
            }

        }
    }

    var IPCGridFooter = $find(xmlForm.DynamicGrid.getGridId("IndParcelComp")).get_masterTableViewFooter();
    $(IPCGridFooter.get_element()).closest('.RadGrid').find('.rgFooterDiv table tr.rgFooter')[0].cells[3].textContent = TotalAmount.toFixed(2);
};
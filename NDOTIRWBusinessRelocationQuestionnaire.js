$(document).ready(function () {
	onRadioButtonChange();
});


function onRadioButtonChange() {
	
    var mode = GetQueryStringParams("Mode");
	
    var ownBuilding = document.getElementById('BURELQU_BuildingOwnership_Id_0');
    var leaseBuilding = document.getElementById('BURELQU_BuildingOwnership_Id_1');

    var monthly = document.getElementById('BURELQU_LeaseTerms_Id_0');
    var annually = document.getElementById('BURELQU_LeaseTerms_Id_1');
    var others = document.getElementById('BURELQU_LeaseTerms_Id_2');

    var manufacturingYes = document.getElementById('BURELQU_Manufacturing_Id_0');
    var manufacturingNo = document.getElementById('BURELQU_Manufacturing_Id_1');

    var nonOccupantYes = document.getElementById('BURELQU_NonOccupantPersonalPropertyOnSite_Id_0');
    var nonOccupantNo = document.getElementById('BURELQU_NonOccupantPersonalPropertyOnSite_Id_1');

    var industrySpecialistYes = document.getElementById('BURELQU_BusinessRequiresIndustrySpecialist_Id_0');
    var industrySpecialistNo = document.getElementById('BURELQU_BusinessRequiresIndustrySpecialist_Id_1');

    var specialInspectionsYes = document.getElementById('BURELQU_BusinessRequiresSpecialInspections_Id_0');
    var specialInspectionsNo = document.getElementById('BURELQU_BusinessRequiresSpecialInspections_Id_1');

    var peakSeasonYes = document.getElementById('BURELQU_BusinessHasPeakSeason_Id_0');
    var peakSeasonNo = document.getElementById('BURELQU_BusinessHasPeakSeason_Id_1');

    var isPartOfOtherEstablishmentYes = document.getElementById('BURELQU_IsPartOfOtherEstablishment_Id_0');
    var isPartOfOtherEstablishmentNo = document.getElementById('BURELQU_IsPartOfOtherEstablishment_Id_1');

    var haveYouLookedYes = document.getElementById('BURELQU_HaveYouLookedForReplacementSite_Id_0');
    var haveYouLookedNo = document.getElementById('BURELQU_HaveYouLookedForReplacementSite_Id_1');

    var anySpecialIssuesYes = document.getElementById('BURELQU_AnySpecialIssuesForReplacementSite_Id_0');
    var anySpecialIssuesNo = document.getElementById('BURELQU_AnySpecialIssuesForReplacementSite_Id_1');

    var useOrStoreChemicalsYes = document.getElementById('BURELQU_UseOrStoreChemicalsOnSite_Id_0');
    var useOrStoreChemicalsNo = document.getElementById('BURELQU_UseOrStoreChemicalsOnSite_Id_1');
	
	var hazardousMaterialsPresentYes = document.getElementById('BURELQU_HazardousMaterialsPresent_Id_0');
    var hazardousMaterialsPresentNo = document.getElementById('BURELQU_HazardousMaterialsPresent_Id_1');
	
    var permittedByEnvAuthorityYes = document.getElementById('BURELQU_PermittedByEnvironmentalAuthority_Id_0');
    var permittedByEnvAuthorityNo = document.getElementById('BURELQU_PermittedByEnvironmentalAuthority_Id_1');

    var areStorageTanksOnSiteYes = document.getElementById('BURELQU_AreStorageTanksOnSite_Id_0');
    var areStorageTanksOnSiteNo = document.getElementById('BURELQU_AreStorageTanksOnSite_Id_1');

    // Initial state handling for new, view, and edit mode
	
	if (leaseBuilding && leaseBuilding.checked) {
        xmlForm.showControl("LeaseTerms");
        xmlForm.showControl("DurationOfLease");
        xmlForm.showControl("MonthlyRent");
        xmlForm.showControl("OtherLeaseObligations");
	}
	else{
		xmlForm.hideControl("LeaseTerms");
        xmlForm.hideControl("DurationOfLease");
        xmlForm.hideControl("MonthlyRent");
        xmlForm.hideControl("OtherLeaseObligations");
        xmlForm.hideControl("OtherTerms");
	}
	
			
    handleLeaseTermsFields();
    handleManufacturingFields();
	
    handleAssistanceRequired();
    handleInspectionPermittingRequired();
    handlePeakSeason();
    handleRelocationOption();
	
    handleDescribeReplacementSite();
    handleWhatAreTheSpecialIssues();
    handleDescribeChemicals();
	handleDescribeHazardousMaterials();
    handleNameOfAgency();
    handleAgencyPermitNumber();
    handleStorageTankFields();
	
	if (nonOccupantYes && nonOccupantYes.checked) {
        xmlForm.showContainer("OwnerPropertyGrid");
    } else {
        xmlForm.hideContainer("OwnerPropertyGrid");
    }

    // Event handlers
    if (ownBuilding) ownBuilding.onclick = handleLeaseBuildingFields;
    if (leaseBuilding) leaseBuilding.onclick = handleLeaseBuildingFields;
    if (monthly) monthly.onclick = handleLeaseTermsFields;
    if (annually) annually.onclick = handleLeaseTermsFields;
    if (others) others.onclick = handleLeaseTermsFields;
    if (manufacturingYes) manufacturingYes.onclick = handleManufacturingFields;
    if (manufacturingNo) manufacturingNo.onclick = handleManufacturingFields;
    if (nonOccupantYes) nonOccupantYes.onclick = handleNonOccupantPersonalPropertyGrid;
    if (nonOccupantNo) nonOccupantNo.onclick = handleNonOccupantPersonalPropertyGrid;

    if (industrySpecialistYes) industrySpecialistYes.onclick = handleAssistanceRequired;
    if (industrySpecialistNo) industrySpecialistNo.onclick = handleAssistanceRequired;

    if (specialInspectionsYes) specialInspectionsYes.onclick = handleInspectionPermittingRequired;
    if (specialInspectionsNo) specialInspectionsNo.onclick = handleInspectionPermittingRequired;

    if (peakSeasonYes) peakSeasonYes.onclick = handlePeakSeason;
    if (peakSeasonNo) peakSeasonNo.onclick = handlePeakSeason;

    if (isPartOfOtherEstablishmentYes) isPartOfOtherEstablishmentYes.onclick = handleRelocationOption;
    if (isPartOfOtherEstablishmentNo) isPartOfOtherEstablishmentNo.onclick = handleRelocationOption;

    if (haveYouLookedYes) haveYouLookedYes.onclick = handleDescribeReplacementSite;
    if (haveYouLookedNo) haveYouLookedNo.onclick = handleDescribeReplacementSite;

    if (anySpecialIssuesYes) anySpecialIssuesYes.onclick = handleWhatAreTheSpecialIssues;
    if (anySpecialIssuesNo) anySpecialIssuesNo.onclick = handleWhatAreTheSpecialIssues;

    if (useOrStoreChemicalsYes) useOrStoreChemicalsYes.onclick = handleDescribeChemicals;
    if (useOrStoreChemicalsNo) useOrStoreChemicalsNo.onclick = handleDescribeChemicals;
	
	if (hazardousMaterialsPresentYes) hazardousMaterialsPresentYes.onclick = handleDescribeHazardousMaterials;
    if (hazardousMaterialsPresentNo) hazardousMaterialsPresentNo.onclick = handleDescribeHazardousMaterials;
	
    if (permittedByEnvAuthorityYes) permittedByEnvAuthorityYes.onclick = handleAgencyPermitNumber;
    if (permittedByEnvAuthorityNo) permittedByEnvAuthorityNo.onclick = handleAgencyPermitNumber;

    if (areStorageTanksOnSiteYes) areStorageTanksOnSiteYes.onclick = handleStorageTankFields;
    if (areStorageTanksOnSiteNo) areStorageTanksOnSiteNo.onclick = handleStorageTankFields;

    function handleLeaseBuildingFields() {
        if (leaseBuilding && leaseBuilding.checked) {
            xmlForm.showControl("LeaseTerms");
            xmlForm.showControl("DurationOfLease");
            xmlForm.showControl("MonthlyRent");
            xmlForm.showControl("OtherLeaseObligations");
			
            xmlForm.setControlValue("LeaseTerms", "");
            xmlForm.setControlValue("DurationOfLease", "");
            xmlForm.setControlValue("OtherLeaseObligations", "");
            xmlForm.setControlValue("MonthlyRent", '', '0.00');
			
			
        } else {
            xmlForm.hideControl("LeaseTerms");
            xmlForm.hideControl("DurationOfLease");
            xmlForm.hideControl("MonthlyRent");
            xmlForm.hideControl("OtherLeaseObligations");
            xmlForm.hideControl("OtherTerms");
        }
    }

    function handleLeaseTermsFields() {
        if (others && others.checked) {
            xmlForm.showControl("OtherTerms");
        } else {
            xmlForm.setControlValue("OtherTerms", "");
            xmlForm.hideControl("OtherTerms");
        }
    }

    function handleManufacturingFields() {
        if (manufacturingYes && manufacturingYes.checked) {
            xmlForm.enableControl("TypeOfManufacturing");
        } else {
            xmlForm.setControlValue("TypeOfManufacturing", "");
            xmlForm.disableControl("TypeOfManufacturing");
        }
    }

    function handleNonOccupantPersonalPropertyGrid() {
        if (nonOccupantYes && nonOccupantYes.checked) {
            xmlForm.showContainer("OwnerPropertyGrid");
        } else {
			if(xmlForm.DynamicGrid.getGridData("OwnerPropertyGrid").length > 0){
				xmlForm.DynamicGrid.bindGridRows('OwnerPropertyGrid', [])
			}
            xmlForm.hideContainer("OwnerPropertyGrid");
        }
    }

    function handleAssistanceRequired() {
        if (industrySpecialistYes && industrySpecialistYes.checked) {
            xmlForm.showControl("AssistanceRequired");
        } else {
            xmlForm.setControlValue("AssistanceRequired", "");
            xmlForm.hideControl("AssistanceRequired");
        }
    }

    function handleInspectionPermittingRequired() {
        if (specialInspectionsYes && specialInspectionsYes.checked) {
            xmlForm.showControl("InspectionPermittingRequired");
        } else {
            xmlForm.setControlValue("InspectionPermittingRequired", "");
            xmlForm.hideControl("InspectionPermittingRequired");
        }
    }

    function handlePeakSeason() {
        if (peakSeasonYes && peakSeasonYes.checked) {
            xmlForm.showControl("PeakSeason");
        } else {
            xmlForm.setControlValue("PeakSeason", "");			
            xmlForm.hideControl("PeakSeason");
        }
    }

    function handleRelocationOption() {
        if (isPartOfOtherEstablishmentYes && isPartOfOtherEstablishmentYes.checked) {
            xmlForm.enableControl("RelocationOption");
        } else {
            xmlForm.setControlValue("RelocationOption", "");			
            xmlForm.disableControl("RelocationOption");
        }
    }

    function handleDescribeReplacementSite() {
        if (haveYouLookedYes && haveYouLookedYes.checked) {
            xmlForm.enableControl("DescribeReplacementSite");
        } else {
			xmlForm.setControlValue("DescribeReplacementSite","");
            xmlForm.disableControl("DescribeReplacementSite");
        }
    }

    function handleWhatAreTheSpecialIssues() {
        if (anySpecialIssuesYes && anySpecialIssuesYes.checked) {
            xmlForm.showControl("WhatAreTheSpecialIssues");
        } else {
            xmlForm.setControlValue("WhatAreTheSpecialIssues", "");
            xmlForm.hideControl("WhatAreTheSpecialIssues");
        }
    }

    function handleDescribeChemicals() {
        if (useOrStoreChemicalsYes && useOrStoreChemicalsYes.checked) {
            xmlForm.enableControl("DescribeChemicals");
        } else {
            xmlForm.setControlValue("DescribeChemicals", "");
			xmlForm.getControl("DescribeChemicals")[0].innerHTML = "";
            xmlForm.disableControl("DescribeChemicals");
        }
    }
	
	function handleDescribeHazardousMaterials(){
		if (hazardousMaterialsPresentYes && hazardousMaterialsPresentYes.checked) {
            xmlForm.enableControl("DescribeHazardousMaterials");
        } else {
            xmlForm.setControlValue("DescribeHazardousMaterials", "");
            xmlForm.disableControl("DescribeHazardousMaterials");
        }
	}

    function handleNameOfAgency() {
        if (permittedByEnvAuthorityYes && permittedByEnvAuthorityYes.checked) {
            xmlForm.enableControl("NameOfAgency");
        } else {
            xmlForm.disableControl("NameOfAgency");
        }
    }

    function handleAgencyPermitNumber() {
        if (permittedByEnvAuthorityYes && permittedByEnvAuthorityYes.checked) {
            xmlForm.enableControl("PermitNumber");
            xmlForm.enableControl("NameOfAgency");
        } else {
            xmlForm.setControlValue("PermitNumber", "");
            xmlForm.setControlValue("NameOfAgency", "");
            xmlForm.disableControl("PermitNumber");
            xmlForm.disableControl("NameOfAgency");
			
        }
    }

    function handleStorageTankFields() {
        if (areStorageTanksOnSiteYes && areStorageTanksOnSiteYes.checked) {
            xmlForm.showControl("TanksOwnedBy");
            xmlForm.showControl("AreTanksRegistered");
        } else {
            xmlForm.setControlValue("TanksOwnedBy", "");
            xmlForm.setControlValue("AreTanksRegistered", "");
            xmlForm.hideControl("TanksOwnedBy");
            xmlForm.hideControl("AreTanksRegistered");
        }
    }
	
}


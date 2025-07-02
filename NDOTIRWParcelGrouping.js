$(document).ready(function () {
    $('#lnkSaveContinue').click(function () {
        if (xmlForm.DynamicGrid.getGridData('ParcelGroup').length < 1) {
            ShowError("Parcel Group grid is mandatory to save the Parcel Grouping.");
            return false;
        }
    });
    $('#lnkSave').click(function () {
        if (xmlForm.DynamicGrid.getGridData('ParcelGroup').length < 1) {
            ShowError("Parcel Group grid is mandatory to save the Parcel Grouping.");
            return false;
        }
    });
});
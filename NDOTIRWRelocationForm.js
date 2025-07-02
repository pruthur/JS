$(document).ready(function () {
    if (xmlForm.getControlValue('NDOTParcelNumber') != '') {
        xmlForm.hideControl("NDOTParcelNumberCtrl");
    }
});
$(window).load(function () {
    var mode = GetQueryStringParams("Mode");
    document.getElementById("hdnAutoSave").value = "No";
    if (mode.toLowerCase() == 'edit') {
        $('#lnkCopyFromView').click(function () {
            IsSave = confirm("To create a duplicate record, you need to save the current record. Do you want to save the current record?");
            if (IsSave) {
                var btnsave = document.getElementById("lnkSaveContinue");
                if (btnsave != null) {
                    document.getElementById("hdnAutoSave").value = "Yes";
                    btnsave.click();
                }
                else {
                    return true;
                }
            }
            return true;
        });
    }
});
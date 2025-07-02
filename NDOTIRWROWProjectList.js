function WFArchiveValidation(ActionName, RouteTo) {
    if (confirm("Are you sure you want to archive the Project? Archived projects cannot be reactivated.")) {
        return true;
    }
    else {
        return false;
    }
};
function hideShowDiv() {
    var x = document.getElementById("sub-main-second");
    var b = document.getElementById("sub-main");

    if (x.style.display !== "none") {
        x.style.display = "none";
        b.style.display = "block";
    }
}
function hideShowDivSecond() {
    var y = document.getElementById("sub-main");
    var a = document.getElementById("sub-main-second");

    if (y.style.display !== "none") {
        y.style.display = "none";
        a.style.display = "block";
    }
    getConcludedCampaigns();
}
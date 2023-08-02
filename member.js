function skillMember() {
    var member = document.getElementById("member");
    var memberValue = member.options[member.selectedIndex].value;
    if (memberValue == "yes") {
        document.getElementById("skill").style.display = "block";
    } else {
        document.getElementById("skill").style.display = "none";
    }
}
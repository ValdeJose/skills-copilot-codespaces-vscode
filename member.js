function skillsMember() {
    var member = document.getElementById('member');
    var memberValue = document.getElementById('member').value;
    var memberError = document.getElementById('memberError');

    if (memberValue === '') {
        member.style.border = '1px solid red';
        memberError.style.display = 'block';
        memberError.style.color = 'red';
        memberError.innerHTML = 'This field is required';
        return false;
    } else {
        member.style.border = '1px solid green';
        memberError.style.display = 'none';
        return true;
    }
}
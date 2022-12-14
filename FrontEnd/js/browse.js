const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener('click', function(){
    this.classList.toggle('is-active');
})

function seeDetails(id){
    window.location.href ="dog_profile.html?id="+id;
}
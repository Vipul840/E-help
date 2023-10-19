  var txt1="Developer!";
var i;
  //typeWriter1();
  setInterval(typeinit,1350);
  function typeinit(){
    i=0;
    document.querySelector("#subhead").innerHTML='';
    setTimeout(typeWriter1,150);
  }
  function typeWriter1(){
    if (i < txt1.length) {
      document.querySelector("#subhead").innerHTML += txt1.charAt(i);
      i++;
      setTimeout(typeWriter1, 150);
    }
  }  

var faq = document.getElementsByClassName("faq-page");
var i;
for(i=0;i<faq.length;i++){
faq[i].addEventListener('click', function () {
  this.classList.toggle("tgle");
    var body = this.nextElementSibling;
    // document.write(body)
//var body=document.getElementsByClassName("faq-ans");
    if (body.style.display == "block")
        body.style.display = "none";
    
    else 
        body.style.display = "block";
    
});
}



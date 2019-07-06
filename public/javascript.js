function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
  // navBar with jQuery

  $(document).ready(function(){
    // $('.slider').slider({full_width: true});
    $('.sidenav').sidenav();
    
    });
  
var a;
function show_hide() {
   if (a==1) {
      document.getElementById('form1').style.display="inline";
      return a=0;
   } else {
      document.getElementById('form1').style.display="none";
      return a=1;
   }
}
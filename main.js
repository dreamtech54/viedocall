verified = 'false'
rdmnmbr = Math.floor(100000 + Math.random() * 900000)
ThunkableWebviewerExtension.postMessage("HII")

function Checkforcode() {
  
  userincode = document.getElementById('code').value
  if (userincode == rdmnmbr) {
    window.open("videocll.html");
    document.getElementById('result').innerHTML = 'Logging you in'
  }
  else
    document.getElementById('result').innerHTML = 'Code Invalids'
}
function checkifverified() {
  
  if (verified == "false") {

    window.open("index.html", "_self");
  }
}

verified = 'false'
rdmnmbr = Math.floor(100000 + Math.random() * 900000)

ThunkableWebviewerExtension.postMessage(rdmnmbr)

function Checkforcode() {
  ThunkableWebviewerExtension.postMessage(rdmnmbr)
  userincode = document.getElementById('code').value
  if (userincode == rdmnmbr) {
    window.open("videocll.html");
    document.getElementById('result').innerHTML = 'Logging you in'
  }
  else
    document.getElementById('result').innerHTML = 'Code Invalid'


}
function checkifverified() {
  ThunkableWebviewerExtension.postMessage(rdmnmbr)

  if (verified == "false") {

    window.open("index.html", "_self");
  }
}

// // Getting Elements from DOM
// const joinButton = document.getElementById("joinBtn");
// const leaveButton = document.getElementById("leaveBtn");
// const toggleMicButton = document.getElementById("toggleMicBtn");
// const toggleWebCamButton = document.getElementById("toggleWebCamBtn");
// const createButton = document.getElementById("createMeetingBtn");
// const videoContainer = document.getElementById("videoContainer");
// const textDiv = document.getElementById("textDiv");

// // Declare Variables
// let meeting = null;
// let meetingId = "";
// let isMicOn = false;
// let isWebCamOn = false;

// function initializeMeeting() {}

// function createLocalParticipant() {}

// function createVideoElement() {}

// function createAudioElement() {}

// function setTrack() {}

// // Join Meeting Button Event Listener
// joinButton.addEventListener("click", async () => {
//   document.getElementById("join-screen").style.display = "none";
//   textDiv.textContent = "Joining the meeting...";

//   roomId = document.getElementById("meetingIdTxt").value;
//   meetingId = roomId;

//   initializeMeeting();
// });

// // Create Meeting Button Event Listener
// createButton.addEventListener("click", async () => {
//   document.getElementById("join-screen").style.display = "none";
//   textDiv.textContent = "Please wait, we are joining the meeting";

//   // API call to create meeting
//   const url = `https://api.videosdk.live/v2/rooms`;
//   const options = {
//     method: "POST",
//     headers: { Authorization: TOKEN, "Content-Type": "application/json" },
//   };

//   const { roomId } = await fetch(url, options)
//     .then((response) => response.json())
//     .catch((error) => alert("error", error));
//   meetingId = roomId;

//   initializeMeeting();
// });

// // Initialize meeting
// function initializeMeeting() {
//     window.VideoSDK.config(TOKEN);
  
//     meeting = window.VideoSDK.initMeeting({
//       meetingId: meetingId, // required
//       name: "Thomas Edison", // required
//       micEnabled: true, // optional, default: true
//       webcamEnabled: true, // optional, default: true
//     });
  
//     meeting.join();
  
//     // Creating local participant
//     createLocalParticipant();
  
//     // Setting local participant stream
//     meeting.localParticipant.on("stream-enabled", (stream) => {
//       setTrack(stream, null, meeting.localParticipant, true);
//     });
  
//     // meeting joined event
//     meeting.on("meeting-joined", () => {
//       textDiv.style.display = "none";
//       document.getElementById("grid-screen").style.display = "block";
//       document.getElementById(
//         "meetingIdHeading"
//       ).textContent = `Meeting Id: ${meetingId}`;
//     });
  
//     // meeting left event
//     meeting.on("meeting-left", () => {
//       videoContainer.innerHTML = "";
//     });
  
//     // Remote participants Event
//     // participant joined
//     meeting.on("participant-joined", (participant) => {
//       //  ...
//     });
  
//     // participant left
//     meeting.on("participant-left", (participant) => {
//       //  ...
//     });
//   }

// // creating video element
// function createVideoElement(pId, name) {
//     let videoFrame = document.createElement("div");
//     videoFrame.setAttribute("id", `f-${pId}`);
  
//     //create video
//     let videoElement = document.createElement("video");
//     videoElement.classList.add("video-frame");
//     videoElement.setAttribute("id", `v-${pId}`);
//     videoElement.setAttribute("playsinline", true);
//     videoElement.setAttribute("width", "300");
//     videoFrame.appendChild(videoElement);
  
//     let displayName = document.createElement("div");
//     displayName.innerHTML = `Name : ${name}`;
  
//     videoFrame.appendChild(displayName);
//     return videoFrame;
//   }
  
//   // creating audio element
//   function createAudioElement(pId) {
//     let audioElement = document.createElement("audio");
//     audioElement.setAttribute("autoPlay", "false");
//     audioElement.setAttribute("playsInline", "true");
//     audioElement.setAttribute("controls", "false");
//     audioElement.setAttribute("id", `a-${pId}`);
//     audioElement.style.display = "none";
//     return audioElement;
//   }
  
//   // creating local participant
//   function createLocalParticipant() {
//     let localParticipant = createVideoElement(
//       meeting.localParticipant.id,
//       meeting.localParticipant.displayName
//     );
//     videoContainer.appendChild(localParticipant);
//   }
  
//   // setting media track
//   function setTrack(stream, audioElement, participant, isLocal) {
//     if (stream.kind == "video") {
//       isWebCamOn = true;
//       const mediaStream = new MediaStream();
//       mediaStream.addTrack(stream.track);
//       let videoElm = document.getElementById(`v-${participant.id}`);
//       videoElm.srcObject = mediaStream;
//       videoElm
//         .play()
//         .catch((error) =>
//           console.error("videoElem.current.play() failed", error)
//         );
//     }
//     if (stream.kind == "audio") {
//       if (isLocal) {
//         isMicOn = true;
//       } else {
//         const mediaStream = new MediaStream();
//         mediaStream.addTrack(stream.track);
//         audioElement.srcObject = mediaStream;
//         audioElement
//           .play()
//           .catch((error) => console.error("audioElem.play() failed", error));
//       }
//     }
//   }

// // Initialize meeting
// function initializeMeeting() {
//     // ...
  
//     // participant joined
//     meeting.on("participant-joined", (participant) => {
//       let videoElement = createVideoElement(
//         participant.id,
//         participant.displayName
//       );
//       let audioElement = createAudioElement(participant.id);
//       // stream-enabled
//       participant.on("stream-enabled", (stream) => {
//         setTrack(stream, audioElement, participant, false);
//       });
//       videoContainer.appendChild(videoElement);
//       videoContainer.appendChild(audioElement);
//     });
  
//     // participants left
//     meeting.on("participant-left", (participant) => {
//       let vElement = document.getElementById(`f-${participant.id}`);
//       vElement.remove(vElement);
  
//       let aElement = document.getElementById(`a-${participant.id}`);
//       aElement.remove(aElement);
//     });
//   }

// // leave Meeting Button Event Listener
// leaveButton.addEventListener("click", async () => {
//     meeting?.leave();
//     document.getElementById("grid-screen").style.display = "none";
//     document.getElementById("join-screen").style.display = "block";
//   });
  
//   // Toggle Mic Button Event Listener
//   toggleMicButton.addEventListener("click", async () => {
//     if (isMicOn) {
//       // Disable Mic in Meeting
//       meeting?.muteMic();
//     } else {
//       // Enable Mic in Meeting
//       meeting?.unmuteMic();
//     }
//     isMicOn = !isMicOn;
//   });
  
//   // Toggle Web Cam Button Event Listener
//   toggleWebCamButton.addEventListener("click", async () => {
//     if (isWebCamOn) {
//       // Disable Webcam in Meeting
//       meeting?.disableWebcam();
  
//       let vElement = document.getElementById(`f-${meeting.localParticipant.id}`);
//       vElement.style.display = "none";
//     } else {
//       // Enable Webcam in Meeting
//       meeting?.enableWebcam();
  
//       let vElement = document.getElementById(`f-${meeting.localParticipant.id}`);
//       vElement.style.display = "inline";
//     }
//     isWebCamOn = !isWebCamOn;
//   });








 // getting Elements from Dom 
 const joinButton = document.querySelector("button");
 const videoContainer = document.getElementById("videoContainer");
 const textDiv = document.getElementById("textDiv");
 
 // decalare Variables
 let participants = [];
 let meeting = null;
 let localParticipant;
 let localParticipantAudio;
 let remoteParticipantId = "";

const checkMediaPermission = async () => {
  //These methods return a Promise that resolve to a Map<string, boolean> object.
  const checkAudioPermission = await VideoSDK.checkPermissions("audio"); //For getting audio permission
  const checkVideoPermission = await VideoSDK.checkPermissions("video"); //For getting video permission
  const checkAudioVideoPermission = await VideoSDK.checkPermissions(
    "audio_video"
  );


 joinButton.addEventListener("click", () => {
   joinButton.style.display = "none";
   textDiv.textContent = "Please wait, we are joining the meeting";
 
   window.VideoSDK.config("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYWIwMWQ3MC04MDg0LTQ3YjItOGI0Ni00MTg0Mzg5YThlNGIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc0NTA1ODMyMiwiZXhwIjoxNzQ1MTQ0NzIyfQ.yEVywPt-iyanGbW82GUPpZLdwQo89GfvCu2USZwCrwQ") // required;
   meeting = window.VideoSDK.initMeeting({
     meetingId: "tsrk-kjz5-h32c", // required
     name: "Dream's Org", // required
     micEnabled: true, // optional, default: true
     webcamEnabled: true, // optional, default: true
   });
 
   meeting.join();
 });

  // creating video element
  function createVideoElement(pId) {
    let videoElement = document.createElement("video");
    videoElement.classList.add("video-frame");
    videoElement.setAttribute("id", `v-${pId}`);
    videoElement.setAttribute("playsinline", true);
    videoElement.setAttribute("width", "300");
    return videoElement;
  }
  
  // creating audio element
  function createAudioElement(pId) {
    let audioElement = document.createElement("audio");
    audioElement.setAttribute("autoPlay", "false");
    audioElement.setAttribute("playsInline", "true");
    audioElement.setAttribute("controls", "false");
    audioElement.setAttribute("id", `a-${pId}`);
    return audioElement;
  }
  
  // creating local participant
  function createLocalParticipant() {
    localParticipant = createVideoElement(meeting.localParticipant.id);
    videoContainer.appendChild(localParticipant);
  }
  
  // setting media track
  function setTrack(stream, audioElement, participant, isLocal) {
    if (stream.kind == "video") {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(stream.track);
      let videoElm = document.getElementById(`v-${participant.id}`);
      videoElm.srcObject = mediaStream;
      videoElm
        .play()
        .catch((error) =>
          console.error("videoElem.current.play() failed", error)
        );
    }
    if (stream.kind == "audio" && !isLocal) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(stream.track);
      audioElement.srcObject = mediaStream;
      audioElement
        .play()
        .catch((error) => console.error("audioElem.play() failed", error));
    }
  }

  joinButton.addEventListener("click", () => {
    // ...
    // ...
    // ...
    
    // creating local participant
      createLocalParticipant();
    
    // setting local participant stream
      meeting.localParticipant.on("stream-enabled", (stream) => {
        setTrack(
          stream,
          localParticipantAudio,
          meeting.localParticipant,
          (isLocal = true)
        );
      });
    
      meeting.on("meeting-joined", () => {
        textDiv.style.display = "none";
      });
    
      // other participants
      meeting.on("participant-joined", (participant) => {
        let videoElement = createVideoElement(participant.id);
        let audioElement = createAudioElement(participant.id);
        remoteParticipantId = participant.id;
    
        participant.on("stream-enabled", (stream) => {
          setTrack(stream, audioElement, participant, (isLocal = false));
        });
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(audioElement);
      });
    
      // participants left
      meeting.on("participant-left", (participant) => {
        let vElement = document.getElementById(`v-${participant.id}`);
        vElement.parentNode.removeChild(vElement);
    
        let aElement = document.getElementById(`a-${participant.id}`);
        aElement.parentNode.removeChild(aElement);
        //remove it from participant list participantId;
        document.getElementById(`p-${participant.id}`).remove();
      });
    });

    

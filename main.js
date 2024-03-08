let APP_ID = "f1436bb9c6944595b9d6d872d67df3b4"

let token = null;
let uid = String(Math.floor(Math.random()*10000));

let client;
let channel;

let localStream; // my own local camera and video
let remoteStream; // the other peer local camera audio and video
let peerConnection;//setting the peer connection

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302','stun:stun2.1.google.com:19302']
        }
    ]
}


let init = async()=>{
 
    client = await AgoraRTM.createInstance(APP_ID);
    await client.login({uid,token});

    //index.html ? room=232342

    // channel = client.createChannel('main');
    // await channel.join();

    // channel.on('MemberJoined',handleUserJoined)
    localStream = await navigator.mediaDevices.getUserMedia({'video':true,'audio':false});
    document.getElementById('user-1').srcObject=localStream;

    createOffer();
}



let handleUserJoined = async(MemberId)=>{
    console.log('A new member joined the channel',MemberId);

}

let createOffer = async()=>{

    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream;
    
    localStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track,localStream);
    })

    peerConnection.ontrack = (event)=>{
        event.streams[0].getTracks().forEach((track)=>{
            remoteStream.addTrack(track);
        })
    }

    peerConnection.onicecandidate = async(event)=>{
        if(event.candidate){
            console.log('New ICE Candidate:', event.candidate)
        }

    }

     let offer = await peerConnection.createOffer();
     await peerConnection.setLocalDescription(offer);

     console.log('offer:',offer)
}

init();


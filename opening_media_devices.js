
// by using the promises
const contraints = {
    'video':true,
    'audio':true
}
navigator.mediaDevices.getUserMedia(contraints)
.then(stream=>{
    console.log('Got media stream:' , stream);
})
.catch(error=>{
    console.log(error.message);
})


// by using the async/await

const openMediaDevices=async(constraints)=>{
    return await navigator.mediaDevices.getUserMedia(constraints);
}

try{
    const stream = openMediaDevices({'audio':false,'video':true});
    console.log('got media stream', stream);
}catch(error){
console.log(error);
}
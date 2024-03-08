
// find an array of device of a certain type
async function getConnectedDevices(type){

    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device=>device.kind==type);
}

const videoCameras = getConnectedDevices('videoinput');
console.log('Cameras found ', videoCameras);
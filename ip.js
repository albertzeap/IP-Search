let callIP = async () => {

    try{
        let response = await fetch("https://api.ipify.org?format=json");

        if(!response){
            let message =  `Error: ${response.status} ${response.statusText}`;
            let error = new Error(message);
            throw error;
        }

        const userIp = await response.json();
        return userIp;

    } catch(err){
        console.error(err);
    }

}

let userIP = document.getElementById("user-ip");

let renderUserIP = () => {
    callIP().then((ipObject) => {
        console.log(ipObject);
        userIP.innerHTML = ipObject.ip;
    });
}

renderUserIP();
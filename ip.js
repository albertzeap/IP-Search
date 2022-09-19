// Call the API that returns the users IP address
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

// Function that calls the API for searching for the details of an IP address
let fetchSearchIP = async (requestedIP) => {
    try{
        let response = await fetch(`https://ipinfo.io/${requestedIP}?token=16b9f720767f17`);

        if(!response){
            let message =  `Error: ${response.status} ${response.statusText}`;
            let error = new Error(message);
            throw error;
        }

        const searchedIp = await response.json();
        return searchedIp;

    } catch(err){
        console.error(err);
    }
}

// Variable for holding the element in which the user IP will be displayed
let userIP = document.getElementById("user-ip");
let ipContent = document.getElementById("ip-content");
let ipContainer = document.getElementById("ip-container");

// Renders the users IP onto the screen
let renderUserIP = () => {
    callIP().then((ipObject) => {
        console.log(ipObject);
        userIP.innerHTML = ipObject.ip;
    });
}


let rendersearchIP = (requestedIP) => {
    fetchSearchIP(requestedIP).then((ipObject) => {
        let ipDetails = document.getElementById("details-container");
        ipDetails.innerHTML = ` 
        <h3>Details</h3>
        <p>IP: ${ipObject.ip}
        <p>Organization: ${ipObject.org}
        <p>Hostname: ${ipObject.hostname}
        <p>City: ${ipObject.city}</p>
        <p>State: ${ipObject.region}</p>
        <p>ZIP: ${ipObject.postal} </p>
        <p>Country: ${ipObject.country}</p>
        `;
        console.log(ipObject);
    });
}

// Hides the details div until actual search is initiated
let hideDiv = () => {
    let detailsDiv = document.getElementById("details-container");
    detailsDiv.style.display = "none";
}

// Shows the details div when search is initiated and hides disclaimer message
let showDiv = () => {
    let detailsDiv = document.getElementById("details-container");
    let disclaimer = document.getElementById("disclaimer");
    detailsDiv.style.display = "block";
    disclaimer.style.display = "none";
}

// Hide details div
hideDiv();

// Always automatically render the users IP onto the page
renderUserIP();

// IP information about requested IP address is only rendered if user desires to
document.querySelector("form").addEventListener("submit",(e) => {
    e.preventDefault();
    let requestedIP = document.getElementById("ip-search").value;
    console.log(requestedIP);
    rendersearchIP(requestedIP);
    showDiv();
});
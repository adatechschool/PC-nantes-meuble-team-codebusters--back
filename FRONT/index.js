async function fetchUrl() {
    const response = await fetch('http://localhost:3000/furnitures');
    const data = await response.json();
    console.log(data)
}

fetchUrl();
async function fetchUrl() {
    // fetch the url in post method in body
    const response = await fetch('http://localhost:3000/furnitures', {
        method: 'POST',
        body: JSON.stringify({
            date: null,
            price: 122,
            category: "assise",
            type: "canapé",
            description: null,
            availability: true,
            photos: ['test']
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
}

fetchUrl();
// async function fetchUrl() {
//     // fetch the url in post method in body
//     const response = await fetch('http://localhost:3000/furnitures', {
//         method: 'POST',
//         body: JSON.stringify({
//             date: null,
//             price: 122,
//             category: "assise",
//             type: "canapé",
//             description: null,
//             availability: true,
//             photos: ['test']
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     const data = await response.json();
//     console.log(data)
// }

// fetchUrl();

async function fetchUser() {
    // fetch the url in post method in body
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify({
            name: "Lolo",
            email: "coco@caramail.fr",
            password: "123456",
            rights: true,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
}

fetchUser();
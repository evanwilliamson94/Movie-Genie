document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const movieInput = document.getElementById("movieInput");

    searchButton.addEventListener("click", async () => {
        const query = movieInput.value;

        if (query) {
            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=84139b78`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Data received:", data);

                
                displayResults(data.Search);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            console.log("Query is empty");
        }
    });
});


function displayResults(movies) {
    console.log("displayResults called with movies:", movies);

    const boxes = document.getElementsByClassName("box");
    
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        console.log("Updating box:", i);

        if (movies[i]) {
            const movie = movies[i];
            console.log("Displaying movie:", movie);
            console.log("Movie Poster URL:", movie.Poster);

            box.innerHTML = 
            `<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">

             <img src="${movie.Poster}" alt="${movie.Title}" style="width: 60%; height: 50%; border-radius: 5%;"/>
                <p style="font-size: 18px; font-weight: bold; color: #ffd60a; margin: 5px 0;">${movie.Title}</p><p style="color: #ffd60a; font-size: 14px; font-weight: bold;">(${movie.Year})</p></div>
                `;
        } else {
            box.innerHTML = "";
            console.log("No movie to display in box:", i);
        }
    }
}

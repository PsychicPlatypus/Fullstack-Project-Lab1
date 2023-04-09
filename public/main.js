let albums;

async function start() {
	fetch("http://localhost:8000/api/albums")
		.then((res) => res.json())
		.then((data) => (albums = data))
		.then(() => displayAlbums())
		.catch((err) => console.log("Error fetching albums: " + err));
}

function displayAlbums() {
	const albumTable = document.getElementById("table-body");
	const albumItems = albums
		.map((album, index) => albumEntry(index, album))
		.join("");

	albumItems === ""
		? (albumTable.innerHTML = `
            <tr class="text-muted mt-5">No albums found... </tr>
        `)
		: (albumTable.innerHTML = albumItems);
}

const albumEntry = (index, album) => {
	return `
    <tr>
		<th scope="row">${index}</th>
		<td>${album.name}</td>
		<td>${album.artist}</td>
		<td>${album.year.replace(/T/, " ").replace(/\..+/, "")}</td>
	</tr>
    `;
};

start();

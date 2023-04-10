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

	const deleteButtons = document.querySelectorAll("#delete-button");
	deleteButtons.forEach((deleteBtn) => {
		deleteBtn.addEventListener("click", (e) => {
			deleteAlbum(e.target.name);
		});
	});
}

const albumEntry = (_, album) => {
	return `
    <tr>
		<th scope="row">${album.id}</th>
		<td>${album.name}</td>
		<td>${album.artist}</td>
		<td>${album.year.replace(/T/, " ").replace(/\..+/, "")}</td>
		<td>
			<button type="button" class="btn btn-success">
				<i class="fa fa-pen"></i>
			</button>
			<button type="button" class="btn btn-danger" name="${
				album.id
			}" id="delete-button">
				<i class="fa fa-xmark"></i>
			</button>
		</td>
	</tr>
    `;
};

function deleteAlbum(id) {
	// Show spinner and disable interactions while it resolves
	fetch(`http://localhost:8000/api/albums/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.message === "Collection not found.") {
				alert("Album not found.");
			} else {
				alert("Album deleted.");
				start();
			}
		})
		.catch((err) => console.log("Error deleting album: " + err));
}

function addAlbum() {
	const album = {
		name: document.getElementById("album-name").value,
		artist: document.getElementById("artist-name").value,
		year: document.getElementById("year").value,
	};

	fetch("http://localhost:8000/api/albums", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(album),
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.message === "Collection already exists.") {
				alert("Album already exists.");
			} else {
				alert("Album added.");
				start();
			}
		})
		.catch((err) => console.log("Error adding album: " + err));
}

start();

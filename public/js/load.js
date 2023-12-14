let updateUser = (id) => {
    let row = document.getElementById(id);
    let avatarInput = row.children[1].children[0];
    let izena = row.children[2].children[0].value;
    let abizena = row.children[3].children[0].value;
    let email = row.children[4].children[0].value;

    let formData = new FormData();
    formData.append('id', id);
    if (avatarInput.files.length > 0) {
        formData.append('avatar', avatarInput.files[0]);
    }
    formData.append('izena', izena);
    formData.append('abizena', abizena);
    formData.append('email', email);

    fetch(`/users/update/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(user => {
        const userAvatar = '/upload/' + (user.avatar || 'avatar-default.png');
        row.innerHTML = `
            <th scope="row">${id}</th>
            <td><img class="avatar" src="${userAvatar}"></td>
            <td>${izena}</td>
            <td>${abizena}</td>
            <td>${email}</td>
            <td> <a onclick="deleteUser('${id}')"><i class="i-button bi bi-trash-fill"></i></a> <a onclick="editUser('${id}')"><i class="i-button bi bi-pencil-square"></i></a>  </td>
        `;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

let editUser = (id) => {
    let row = document.getElementById(id);
    let izena = row.children[2].innerHTML;
    let abizena = row.children[3].innerHTML;
    let email = row.children[4].innerHTML;
    row.innerHTML = `
        <th scope="row">${id}</th>
        <td><input type="file" id="avatar"></td>
        <td><input type="text" id="izena" value="${izena}"></td>
        <td><input type="text" id="abizena" value="${abizena}"></td>
        <td><input type="text" id="email" value="${email}"></td>
        <td> <input type="button" onclick="updateUser('${id}')" value="Save"> </td>
    `;
}

let insertUser = (user) => {
    const userAvatar = '/upload/' + (user.avatar || 'avatar-default.png');
    var tableBody = document.getElementById("userTableBody");

    fetch(window.location.origin + userAvatar);

    var newRow = tableBody.insertRow();
    newRow.setAttribute("id", user._id);
    newRow.innerHTML = `
        <th scope="row">${user._id}</th>
        <td><img class="avatar" src="${userAvatar}"></td>
        <td>${user.izena}</td>
        <td>${user.abizena}</td>
        <td>${user.email}</td>
        <td><a onclick="deleteUser('${user._id}')"><i class="i-button bi bi-trash-fill"></i></a> <a onclick="editUser('${user._id}')"><i class="i-button bi bi-pencil-square"></i></a>  </td>
    `;
};

let deleteUser = id => {
    fetch(`/users/delete/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        let row = document.getElementById(id);
        row.parentNode.removeChild(row);
        console.log(data);  // handle the response data or action
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formularioa").addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('izena', e.target.izena.value);
        formData.append('abizena', e.target.abizena.value);
        formData.append('email', e.target.email.value);

        const avatarInput = e.target.avatar;
        if (avatarInput.files.length > 0) {
            formData.append('avatar', avatarInput.files[0]);
        }

        fetch("/users/new", {
            method: "POST",
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            insertUser(data);
            e.target.reset();
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });

    // Sample JSON array of users

    fetch("/users/list")
    .then(response => response.json())
    .then(users => {
        console.log(users);
        users.forEach((user) => {
            insertUser(user);
        });
    });
});

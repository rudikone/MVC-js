function loadUsers() {
    fetch("http://localhost:8080/admin/users")
        .then(response => response.json())
        .then(data => {
            $("#usersList").empty();
            let table = ""
            table += ('<tr>')
            for (let i = 0; i < data.length; i++) {

                if (data[i].roles.length > 1) {
                    var userRole = data[i].roles[0].role + ', ' + data[i].roles[1].role
                } else {
                    var userRole = data[i].roles[0].role
                }

                table += ('<td>' + data[i].id + '</td>')
                table += ('<td>' + data[i].firstName + '</td>')
                table += ('<td>' + data[i].lastName + '</td>')
                table += ('<td>' + data[i].age + '</td>')
                table += ('<td>' + data[i].email + '</td>')
                table += ('<td>' + userRole.replace(/ROLE_/g, '') + '</td>')
                table += ('<td><button id="' + data[i].id + '" type="button" class="edit btn btn-primary" data-toggle="modal" data-target="#editModal" data-id="' + data[i].id + '">Edit</button></td>')
                table += ('<td><button type="button" class="delete btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="' + data[i].id + '">Delete</button></td>')
                table += ('</tr>')
            }
            $('#usersList').append(table)
        });
}

loadUsers();

$('#userstable-tab').on('click', loadUsers());

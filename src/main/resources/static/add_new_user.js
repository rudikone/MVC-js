function addNewUser() {
    $('#addNewUser').on('click', function () {

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var age = document.getElementById("age").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var role;

        var select = document.getElementById("roleSelect"); // Выбираем  select по id
        var roleId = select.options[select.selectedIndex].value; // Значение value для выбранного option

        //здесь пытался вытаскивать роли из бд функцией get_role, но промис не разрешает вытащить из себя данные

        if (roleId == 1) {
            role = [{id: 1, role: "ROLE_ADMIN", users: null, authority: "ROLE_ADMIN"}];
        }

        if (roleId == 2) {
            role = [{id: 2, role: "ROLE_USER", users: null, authority: "ROLE_USER"}];
        }

        var user = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: role
        };

        fetch("http://localhost:8080/admin/users/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
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
                    table += ('<td>' + userRole + '</td>')
                    table += ('<td><button id="' + data[i].id + '" type="button" class="edit btn btn-primary" data-toggle="modal" data-target="#editModal" data-id="' + data[i].id + '">Edit</button></td>')
                    table += ('<td><button type="button" class="delete btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="' + data[i].id + '">Delete</button></td>')
                    table += ('</tr>')
                }
                $('#usersList').append(table)

            });

        $('#new').removeClass('show active');
        $('#newuser-tab').removeClass('active');
        $('#alluserstable').addClass('show active');
        $('#userstable-tab').addClass('active');

    });
}

addNewUser();


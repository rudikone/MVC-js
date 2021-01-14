//способ вывести модалку 2

$(document).delegate('.edit', 'click', function () {
    var id = $(this).attr('id');
    getModalEdit(id);
})

function getModalEdit(id) {

    fetch("http://localhost:8080/admin/users/" + id)
        .then(response => response.json())
        .then(user => {

            console.log(user)

            let myModalBody = ""

            myModalBody += ('<form>')

            myModalBody += ('<div class="form-group">' +
                '<label for="idEdit">ID</label>' +
                '<input type="text" class="form-control" id="idEdit"name="id" value="' + user.id + '" disabled/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="firstNameEdit">' + "First name" + '</label>' +
                '<input type="text" class="form-control" id="firstNameEdit" value="' + user.firstName + '" name="firstName"/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="lastNameEdit">' + "Last name" + '</label>' +
                '<input type="text" class="form-control" id="lastNameEdit" value="' + user.lastName + '" name="lastName"/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="ageEdit">' + "Age" + '</label>' +
                '<input type="text" class="form-control" id="ageEdit" value="' + user.age + '" name="age"/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="emailEdit">' + "Email" + '</label>' +
                '<input type="text" class="form-control" id="emailEdit" value="' + user.email + '" name="email"/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="passwordEdit">' + "Password" + '</label>' +
                '<input type="text" class="form-control" id="passwordEdit" value="' + " " + '" name="password" value=""/>' +
                '</div>')

            myModalBody += ('<label for="roleSelectEditDiv">' + "Role" + '</label>' +
                '<div class="form-group" id="roleSelectEditDiv">' +

                '<select size="2" multiple required class="form-control"id="roleSelectEdit" name="roles">' +
                '<option id="1">' + "ROLE_ADMIN" +
                '</option>' +
                '<option id="2">' + "ROLE_USER" +
                '</option>' +
                '</select>' +

                '</div>')

            myModalBody += ('</form>')

            myModalBody += ('<div class="modal-footer">' +
                '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + "Close" +
                '</button>' +
                '<button id="userEditButton" class="btn btn-primary" data-dismiss="modal">' + "Edit" + '</button>' +
                '</div>')

            $('#editModalBody').append(myModalBody)


            $('#userEditButton').on('click', function () {

                var id = document.getElementById("idEdit").value;
                var firstName = document.getElementById("firstNameEdit").value;
                var lastName = document.getElementById("lastNameEdit").value;
                var age = document.getElementById("ageEdit").value;
                var email = document.getElementById("emailEdit").value;
                var password = document.getElementById("passwordEdit").value;
                // var role;
                //
                // var select = document.getElementById("roleSelectEdit"); // Выбираем  select по id
                // var roleId = select.options[select.selectedIndex].id; // Значение value для выбранного option
                //
                // if (roleId == 1) {
                //     role = [{id: 1, role: "ROLE_ADMIN", users: null, authority: "ROLE_ADMIN"}];
                // }
                //
                // if (roleId == 2) {
                //     role = [{id: 2, role: "ROLE_USER", users: null, authority: "ROLE_USER"}];
                // }
                var role = new Array;

                var len = document.getElementById("roleSelectEdit").options.length;
                var i = 0;

                for (var n = 0; n < len; n++) {
                    if (document.getElementById("roleSelectEdit").options[n].selected == true) {
                        if (document.getElementById("roleSelectEdit").options[n].id == 1) {
                            role[i] = {id: 1, role: "ROLE_ADMIN", users: null, authority: "ROLE_ADMIN"};
                        } else if (document.getElementById("roleSelectEdit").options[n].id == 2) {
                            role[i] = {id: 2, role: "ROLE_USER", users: null, authority: "ROLE_USER"};
                        }

                        i++;
                    }

                }

                let userForEdit = {
                    id: id,
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
                    body: JSON.stringify(userForEdit)
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
                            table += ('<td>' + userRole.replace(/ROLE_/g, '') + '</td>')
                            table += ('<td><button id="' + data[i].id + '" type="button" class="edit btn btn-primary" data-toggle="modal" data-target="#editModal" data-id="' + data[i].id + '">Edit</button></td>')
                            table += ('<td><button type="button" class="delete btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="' + data[i].id + '">Delete</button></td>')
                            table += ('</tr>')
                        }
                        $('#usersList').append(table)

                    });

            });
        });

    $("#myModalEdit").modal('show');
    $('#editModalBody').empty();
}



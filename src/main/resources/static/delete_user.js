//способ вывода модалки 1
$('#deleteModal').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('id')

    fetch("http://localhost:8080/admin/users/" + id)
        .then(response => response.json())
        .then(user => {

            $('#deleteModalBody').empty();

            let myModalBody = ""

            myModalBody += ('<div class="form-group">' +
                '<label for="idEdit">ID</label>' +
                '<input type="text" class="form-control" id="idEdit"name="id" value="' + user.id + '" disabled/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="firstNameEdit">' + "First name" + '</label>' +
                '<input type="text" class="form-control" id="firstNameEdit" value="' + user.firstName + '" name="firstName" disabled/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="lastNameEdit">' + "Last name" + '</label>' +
                '<input type="text" class="form-control" id="lastNameEdit" value="' + user.lastName + '" name="lastName" disabled/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="ageEdit">' + "Age" + '</label>' +
                '<input type="text" class="form-control" id="ageEdit" value="' + user.age + '" name="age" disabled/>' +
                '</div>')
            myModalBody += ('<div class="form-group">' +
                '<label for="emailEdit">' + "Email" + '</label>' +
                '<input type="text" class="form-control" id="emailEdit" value="' + user.email + '" name="email" disabled/>' +
                '</div>')


            myModalBody += ('<label for="roleSelectDelete">' + "Role" + '</label>' +
                '<div class="form-group" id="roleSelectDelete">' +

                '<select size="2" multiple required class="form-control"id="roleSelectEdit" name="roles" disabled>' +
                '<option value="ROLE_ADMIN">' + "ROLE_ADMIN" +
                '</option>' +
                '<option value="ROLE_USER">' + "ROLE_USER" +
                '</option>' +
                '</select>' +

                '</div>')


            myModalBody += ('<div class="modal-footer">' +
                '<button id="userDeleteCloseButton" type="button" class="btn btn-secondary" data-dismiss="modal">' + "Close" +
                '</button>' +
                '<button id="userDeleteButton" class="btn btn-danger" data-dismiss="modal">' + "Delete" + '</button>' +
                '</div>')

            $('#deleteModalBody').append(myModalBody)

            //проверяем роль и устанвливаем selected
            for (var i = 0; i < user.roles.length; i++) {
                if (user.roles[i].id == 1) {
                    $("select option[value='ROLE_ADMIN']").attr("selected", "selected");
                }

                if (user.roles[i].id == 2) {
                    $("select option[value='ROLE_USER']").attr("selected", "selected");
                }
            }

            $('#userDeleteButton').on('click', function () {

                var id = document.getElementById("idEdit").value;
                var firstName = document.getElementById("firstNameEdit").value;
                var lastName = document.getElementById("lastNameEdit").value;
                var age = document.getElementById("ageEdit").value;
                var email = document.getElementById("emailEdit").value;
                var password = user.password;
                var role = user.roles

                let userForDelete = {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    email: email,
                    password: password,
                    roles: role
                };

                fetch("http://localhost:8080/admin/users/" + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userForDelete)
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

                            let regexp = /\w+/g; // без флага g свойство lastIndex игнорируется
                            regexp.lastIndex = 5; // ищем с 5-й позиции (т.е с запятой и далее)

                            table += ('<td>' + data[i].id + '</td>')
                            table += ('<td>' + data[i].firstName + '</td>')
                            table += ('<td>' + data[i].lastName + '</td>')
                            table += ('<td>' + data[i].age + '</td>')
                            table += ('<td>' + data[i].email + '</td>')
                            table += ('<td>' + regexp.exec(userRole) + '</td>')
                            table += ('<td><button id="' + data[i].id + '" type="button" class="edit btn btn-primary" data-toggle="modal" data-target="#editModal" data-id="' + data[i].id + '">Edit</button></td>')
                            table += ('<td><button type="button" class="delete btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-id="' + data[i].id + '">Delete</button></td>')
                            table += ('</tr>')
                        }
                        $('#usersList').append(table)

                    });
            });
        });
});







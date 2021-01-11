//слушатель для отрисовки поля создания нового юзера
$('#newuser-tab').on('click', function () {
    $('#pageForCreate').empty();
    let divForCreate = '';
    divForCreate += ('<form>')
    divForCreate += ('<div class="form-group">' +
        '<label for="firstName">' + "First Name" + '</label>' +
        '<input type="text" class="form-control" id="firstName" placeholder="Name">' +
        '</div>')

    divForCreate += ('<div class="form-group">' +
        '<label for="lastName">' + "Last Name" + '</label>' +
        '<input type="text" class="form-control" id="lastName" placeholder="Last name">' +
        '</div>')

    divForCreate += ('<div class="form-group">' +
        '<label for="age">' + "Age" + '</label>' +
        '<input type="text" class="form-control" id="age" placeholder="Age">' +
        '</div>')

    divForCreate += ('<div class="form-group">' +
        '<label for="email">' + "Email" + '</label>' +
        '<input type="text" class="form-control" id="email" placeholder="Email">' +
        '</div>')

    divForCreate += ('<div class="form-group">' +
        '<label for="password">' + "Password" + '</label>' +
        '<input type="text" class="form-control" id="password" placeholder="Password">' +
        '</div>')

    divForCreate += ('<div class="form-group">' +

        '<select size="2" multiple class="form-control" id="roleSelect" name="roleSet">' +
        '</select>' +

        '</div>')

    divForCreate += ('</form>')

    divForCreate += ('<div>' +
        '<button id="addNewUser" class="btn btn-success">' + "Add new user" + '</button>' +
        '</div>')


    $('#pageForCreate').append(divForCreate)
});
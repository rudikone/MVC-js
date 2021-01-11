//функция для страницы админа
function getAdminInformation() {
    fetch("http://localhost:8080/admin/users/info")
        .then(response => response.json())
        .then(data => {
            let table = ""

            if (data.roles.length > 1) {
                var role = data.roles[0].role + ', ' + data.roles[1].role
            } else {
                var role = data.roles[0].role
            }

            let regexp = /\w+/g; // без флага g свойство lastIndex игнорируется
            regexp.lastIndex = 5; // ищем с 5-й позиции (т.е с запятой и далее)

            table += ('<tr>')
            table += ('<td>' + data.id + '</td>')
            table += ('<td>' + data.firstName + '</td>')
            table += ('<td>' + data.lastName + '</td>')
            table += ('<td>' + data.age + '</td>')
            table += ('<td>' + data.email + '</td>')
            table += ('<td>' + regexp.exec(role) + '</td>')
            table += ('</tr>')
            $('#auth_user').append(table)

            regexp = /\w+/g; // без флага g свойство lastIndex игнорируется
            regexp.lastIndex = 5; // ищем с 5-й позиции (т.е с запятой и далее)

            $('#userInfo').html(data.email + ' with role: ' + regexp.exec(role))
        })
}

getAdminInformation();
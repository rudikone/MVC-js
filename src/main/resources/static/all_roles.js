//функция для отрисовки ролей
function loadRoles() {
    fetch("http://localhost:8080/admin/roles")
        .then(response => response.json())
        .then(data => {

            var select = document.getElementById("roleSelect");
            var options = data;

            for (var i = 0; i < options.length; i++) {
                var opt = options[i].role;
                var el = document.createElement("option");

                for (j = 0; j < options.length; j++) {
                    el.id = j;
                }

                el.textContent = opt;
                el.value = options[i].id;

                select.appendChild(el);

            }
        })
}

loadRoles();
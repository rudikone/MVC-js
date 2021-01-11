//функция для вытаскивания роли из бд. не работает внутри другого промис
async function getRole(id) {
    let result = (await fetch("http://localhost:8080/admin/roles/" + id, {
        method: 'GET'
    })).json();

    return result;
}

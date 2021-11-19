const updateBtn = document.getElementById('exportBtn');

Array.from(updateBtn).forEach((el) => {
    el.addEventListener('click', sendData);
});

async function sendData() {
    const data = updateBtn
    try {
        const response = await fetch('sendData', {
            method: 'put',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'updateData': data
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err.message)
    }
}
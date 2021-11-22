/*
const updateBtn = document.getElementById('exportBtn');
const tableRows = document.querySelectorAll('.data-row')

updateBtn.addEventListener('click', sendData);


async function sendData() {
    const newData = []
    tableRows.forEach(tr => {
        newRow = {
            "id" : tr.childNodes[1].textContent,
            "year": tr.childNodes[3].textContent,
            "number": tr.childNodes[5].textContent,
            "team": tr.childNodes[7].textContent,
            "name": tr.childNodes[9].textContent,
        }

        newData.push(newRow)
        console.log(newData);
    })
    

    try {
        const response = await fetch(`/kapital/1`, { //'sendData'
            method: 'put',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'updateData': newData
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err.message)
    }
}

//windows.event.target
//grab by the :id, make it = dipalayallcarddata
*/

const updateBtn = document.getElementById('exportBtn');
const tableRows = document.getElementById('data-row')

updateBtn.addEventListener('click', sendData);

async function sendData() {
    const year = this.parentNode.childNodes[3].innerText;
    const number = this.parentNode.childNodes[5].innerText;
    const name = this.parentNode.childNodes[9].innerText;
    const team = this.parentNode.childNodes[7].innerText;

    console.log(year);
    try {
        const response = await fetch(`/kapital/1`, {
            method: 'put',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify({
                //"id" : tableRows.childNodes[1].textContent,
                "updateData": year,
                "updateData": number,
                "updateData": team,
                "updateData": name
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.error(err.message)
    }
}

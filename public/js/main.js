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
const tableRows = document.getElementById('data-row');

updateBtn.addEventListener('click', sendData);

async function sendData(event) {
    console.log(tableRows)
    console.log(event.target)
    const id = tableRows.childNodes[1].textContent;
    const year = tableRows.childNodes[3].textContent;
    const number = tableRows.childNodes[5].textContent;
    const team = tableRows.childNodes[7].textContent;
    const name = tableRows.childNodes[9].textContent;
    console.log(id)
    console.log(year);
    console.log(number);
    console.log(name);
    console.log(team);
    try {
        const response = await fetch(`/kapital/${id}`, {
            method: 'put',
            header: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "year": year,
                "number": number,
                "team": team,
                "name": name
            })
        })
        const data = await response.json()
        console.log(data)
       // location.reload()
    } catch (err) {
        console.error(err.message)
    }
}

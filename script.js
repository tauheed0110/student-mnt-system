let tbody = document.querySelector('table').tBodies[0];
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortAZ = document.getElementById('sort-az');
const sortZA = document.getElementById('sort-za');
const sortMarks = document.getElementById('sort-marks');
const sortPassing = document.getElementById('sort-passing');
const sortClass = document.getElementById('sort-class');
const sortGender = document.getElementById('sort-gender');

let arr = [];

const fetchData = ()=>{
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        arr = data;
        renderData(arr);
    })
    .catch(err => {
        console.log(err);
    })
}

fetchData();

function renderData(arr){
    tbody.innerHTML = "";
    arr.map(data =>{
        tbody.innerHTML += `
        <tr>
            <td class="col1">${data.id}</td>
            <td class="col2">
                <div class='col2-flex'>
                    <div class='img-circle-box'>
                        <img width='40px' height='40px' src='${data.img_src}'>
                    </div>${data.first_name} ${data.last_name}
                </div>
            </td>
            <td class="col3">${data.gender}</td>
            <td class="col4">${data.class}</td>
            <td class="col5">${data.marks}</td>
            <td class="col6">${data.passing ? 'Passed': 'Failed'}</td>
            <td class="col7">${data.email}</td>
        </tr>
        `;
    })
}


searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    const newArr = arr.filter(data => {
       return data.first_name.toLowerCase().includes(query) ||
       data.last_name.toLowerCase().includes(query) ||
       data.email.toLowerCase().includes(query)
    });
    renderData(newArr);
});

searchBtn.addEventListener('click', ()=>{
    const query = searchInput.value.toLowerCase();
    const newArr = arr.filter(data => {
       return data.first_name.toLowerCase().includes(query) ||
       data.last_name.toLowerCase().includes(query) ||
       data.email.toLowerCase().includes(query)
    });
    renderData(newArr);
})

sortAZ.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return a.first_name.localeCompare(b.first_name);
    });
    renderData(arr);
});
sortZA.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return a.last_name.localeCompare(b.last_name);
    });
    renderData(arr);
});
sortMarks.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return a.marks - b.marks;
    });
    renderData(arr);
});
sortPassing.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return b.passing ? 'Passed': 'Failed'.localeCompare(a.passing ? 'Passed': 'Failed');
    });
    renderData(arr);
});

sortClass.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return a.class - b.class;
    });
    renderData(arr);
});
sortGender.addEventListener('click', ()=>{
    arr.sort((a, b) => {
        return a.gender.localeCompare(b.gender);
    });
    renderData(arr);
});

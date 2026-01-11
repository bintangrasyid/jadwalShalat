function prayerTimes(latitude, longitude) {
    fetch('http://api.aladhan.com/v1/calendar?latitude=' + latitude + '&longitude=' + longitude + '&method=9').then(response => response.json()).then(function (response) {
        let date = new Date();
        let today = date.getDate() - 1;
        let data = response.data[0].timings;

        let app = document.getElementById('app');
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');

        for (i in data) {
            let row = tbody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);
            name.innerHTML = i;
            time.innerHTML = data[i];
            tbody.appendChild(row);
        }
        table.appendChild(tbody);
        app.appendChild(table);
    });

}


function success(position) {
    prayerTimes(position.coords.latitude, position.coords.longitude);
}

function error() {
    // default menggunakan jakarta
    prayerTimes('-6.200000', '106.816666') // jakarta
    // prayerTimes('-6.966667', '110.416664'); // semarang
    // prayerTimes('-5.135399', '119.423790'); // makkasar
}

function userLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung didalam browser anda, silahkan gunakan browser lain');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index() {
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');
    h3.innerHTML = "Prayer Times";

    app.appendChild(h3);

    userLocation();
}

index();

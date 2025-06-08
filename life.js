
function store(e) {
    e.preventDefault()
    const form = document.querySelector('#register-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    var account = {
        fullname: '',
        username: '',
        password: '',
    };

    account.fullname = document.getElementById('fullname').value;
    account.username = document.getElementById('username').value;
    account.password = document.getElementById('password').value;


    let accounts = JSON.parse(localStorage.getItem('All accounts')) || []


    if (accounts.some(a => {
        return a.username == account.username
    })) {
        Swal.fire("Error!", "Username has already been used", "error");
        return;
    }
    Swal.fire("Great!", "User correctly registered", "success").then(okay => {
        if (okay) {
            window.location.href = "index.html";
        }
    });


    accounts.push(account);

    localStorage.setItem('All accounts', JSON.stringify(accounts));

}


function check(e) {
    e.preventDefault()
    const form = document.querySelector('#login-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    var accounts = JSON.parse(localStorage.getItem('All accounts'));

    var pw = document.getElementById('pw').value;
    var user = document.getElementById('user').value;


    if (accounts.some(a => {
        localStorage.setItem('User login', JSON.stringify(a))
        return a.username == user && a.password == pw
    })) {
        Swal.fire("Completed!", "User logged correctly", "success").then(okay => {
            if (okay) {
                window.location.href = "tasks.html";
            }
        })
    }
    else {
        Swal.fire("Error!", "User not logged correctly", "error");
    }
}



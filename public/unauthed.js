const login = {
    init: () => {
        this.username = document.querySelector('#username');
        this.password = document.querySelector('#password');
        this.submit = document.querySelector('#submit-credentials');

        this.submit.addEventListener('click', () => {
            console.log(this.username.value);
            let data = { user: this.username.value, password: this.password.value };
            console.log(data);
            fetch('/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log('res: ', res);
            })
            .catch((err) => {
                console.log('error is: ', err);
            })
        });
    }
}

login.init();
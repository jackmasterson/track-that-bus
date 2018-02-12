const users = [{
    username: 'jack',
    password: 'jackcm',
}, {
    username: 'tom',
    password: 'tomgm'
}];

module.exports = {
    run: () => {
        console.log('users are: ', users);
        return users;
    }
}
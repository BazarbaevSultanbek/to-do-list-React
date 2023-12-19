export class Users {
    saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    usersFromLocalStorage() {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        return users;
    }
    addUser(user) {
        let newUser = JSON.parse(localStorage.getItem('users') || '[]')
        newUser.push(user)
        localStorage.setItem("users", JSON.stringify(newUser))
    }
}
let users = new Users().usersFromLocalStorage();
if (users.length === 0) {
    users = [
        {
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            isAdmin: true,
            id: 745972
        },
        {
            username: "Sam",
            email: 'bazarbaeoff@gmail.com',
            password: 'bbbb',
            isAdmin: false,
            id: 263704
        }
    ];

    new Users().saveUsersToLocalStorage(users);
}
export { users };


export class CurrentUser {
    saveCurrentUserToLocalStorage(CurrentUser) {
        localStorage.setItem('CurrentUser', JSON.stringify(CurrentUser));
    }

    CurrentUserFromLocalStorage() {
        let CurrentUser = JSON.parse(localStorage.getItem('CurrentUser') || '[]');
        return CurrentUser;
    }
}

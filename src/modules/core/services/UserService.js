import LocalStorageService from './LocalStorageService';

const getUsers = () => {
    return LocalStorageService.get('users') || [];
}

const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    LocalStorageService.save('users', users);
}

const UserService = { getUsers, saveUser };

export default UserService;
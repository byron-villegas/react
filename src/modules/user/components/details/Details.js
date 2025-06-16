import Add from '../add/Add';
import List from '../list/List';
import Core from '../../../core';

function Details() {
    let users = Core.UserService.getUsers();

    return (
        <div className='ms-3'>
            <h1 className="text-white">User Details</h1>
            <Add />
            <List users={users} />
        </div>
    )
}

export default Details;
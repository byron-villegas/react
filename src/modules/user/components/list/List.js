import Utils from '../../../utils';
import './List.css';

function List({ users }) {

    return (
        <div>
            <h3 className="text-white">Users</h3>
            <table className="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RUT</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha Nacimiento</th>
                        <th>Edad</th>
                        <th>Sexo</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="pointer" onMouseMove={Utils.Events.Table.onRowMouseMove} onMouseLeave={Utils.Events.Table.onRowMouseLeave}>
                            <td>{index + 1}</td>
                            <td>{user.rut}</td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.fechaNacimiento}</td>
                            <td>{user.edad}</td>
                            <td>{user.sexo}</td>
                            <td>{Utils.Functions.formatBalance(user.saldo)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
import './List.css';

import { useEffect, useState } from 'react';
import Core from '../../../core';

function List() {
    const [peoples, setPeoples] = useState([]);

    useEffect(() => {
        async function fetchPeoples() {
            try {
                const data = await Core.StarWarsService.findAllPeople()

                console.log('Data fetched:', data);
                
                setPeoples(data);
            } catch (error) {
                console.error('Error fetching Star Wars people:', error);
            }
        }
        fetchPeoples();
    }, []);

    return (
        <div>
            <h3 className="text-white">Peoples</h3>
            <table className="table table-dark table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {peoples.map((people, index) => (
                        <tr key={index} className="pointer">
                            <td>{people.url.split('people/')[1]}</td>
                            <td>{people.name}</td>
                            <td>
                                <a href={'/starwars/people/' + people.url.split('people/')[1]} class="text-decoration-none text-white">
                                    View
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;
import './View.css';

import { useEffect, useState } from 'react';
import Core from '../../../core';
import { useParams } from 'react-router-dom';

function View() {
    const { id } = useParams();

    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchPeople() {
            try {
                const data = await Core.StarWarsService.findPeopleById(id)

                console.log('Data fetched:', data);

                setPeople(data);
            } catch (error) {
                console.error('Error fetching Star Wars people:', error);
            }
        }
        fetchPeople();
    }, [id]);

    return (
        <div className="ms-3">
            <h1 className="text-white">People Details</h1>
            <h2 className="text-white">People ID: {id}</h2>
            <h2 className="text-white">Name: {people?.name}</h2>
            <h2 className="text-white">Height: {people?.height}</h2>
            <h2 className="text-white">Hair Color: {people?.hair_color}</h2>
            <h2 className="text-white">Eye Color: {people?.eye_color}</h2>
            <h2 className="text-white">Birth Year: {people?.birth_year}</h2>
            <h2 className="text-white">Gender: {people?.gender}</h2>
            <div className="row">
                <div className="col-6">
                    <h3 className="text-white">Films:</h3>
                    <ul className="list-group">
                        { people?.films?.map((film, index) => (
                            <li key={index} className="list-group-item list-group-item-dark text-white">
                                {film}
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default View;
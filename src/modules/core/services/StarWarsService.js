import configuration from '../configuration/configuration';

const findAllPeople = async () => {
    const response = await fetch(`${configuration.server.url}/${configuration.server.paths.people}`);

    if (!response.ok) {
        throw new Error('Error to fetch peoples from the server');
    }

    const result = await response.json();

    return result;
}

const findPeopleById = async (id) => {
    const response = await fetch(`${configuration.server.url}/${configuration.server.paths.people}/${id}`);

    if (!response.ok) {
        throw new Error('Error to fetch people from the server');
    }

    const result = await response.json();

    return result;
}

const StarWarsService = { findAllPeople, findPeopleById }

export default StarWarsService;
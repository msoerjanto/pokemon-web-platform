import { useQuery } from "@apollo/client";
import { GET_POKEMONS_QUERY } from "../graphql/queries/getPokemons";
import withContext from "../withContext";

function PokeList() {
    const gqlVariables = {
        limit: 2,
        offset: 1,
    };
    const { loading, error, data } = useQuery(GET_POKEMONS_QUERY, {variables: gqlVariables});
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log('Response from server', data);
    return (
        <div>

        </div>
    );
}

export default withContext(PokeList);
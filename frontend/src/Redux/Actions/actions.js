import axios from 'axios'; 

export function getAllApi() {
    return async function(dispatch) {
        try {
            const apiInfo = await axios.get('localhost:3001/characters');
            return dispatch({
                type:'GET_CHARACTERS',
                payload: apiInfo.data
            })
        }
        catch(err) {
            console.log(err)
        }
    }
}
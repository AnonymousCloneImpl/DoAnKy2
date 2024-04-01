import axios from "axios";

const postMethodFetcher = async (url, body) => {
    const response = await axios.post(url, body);

    return response.data;
};

export default postMethodFetcher;
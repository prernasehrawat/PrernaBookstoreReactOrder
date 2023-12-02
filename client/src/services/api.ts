import axios from "axios";

export default axios.create(
    {
        // baseURL: 'http://localhost:8080/PrernaBookstoreReactOrder/api',
        baseURL:'http://webdev.cs.vt.edu:8080/PrernaBookstoreReactOrder/api',
    }
)
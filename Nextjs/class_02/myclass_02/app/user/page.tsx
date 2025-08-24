import axios from 'axios';

export default async function User(){

    const response = await axios.get("http://localhost:3000/api/v1/user/detail");


    const data = response.data;

  

    return (
        <div>
            User page
            {data.name}
            {data.title}
        </div>
    )
}
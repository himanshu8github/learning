import axios from 'axios';

export default async function User(){

    const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details");

    await new Promise(r => setTimeout(r, 5000))

    const data = response.data;

    console.log('hi there')

    return (
        <div>
            User page
            {data.name}
            {data.title}
        </div>
    )
}
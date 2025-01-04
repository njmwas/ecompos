import * as React from "react";
import { DataContext } from "../contexts/data.context";

function Home() {
    const data = React.useContext(DataContext)

    console.log(data)

    return ( <>
        <div className="h-[300px] border-2 border-gray-600 flex flex-col justify-center m-auto">
            <h3 className="text-2xl font-black text-center">Welcome To Flask-React</h3>
            <p className="text-center">A flask applicaiton with a react frontend</p>
        </div>
    </> );
}

export default Home;
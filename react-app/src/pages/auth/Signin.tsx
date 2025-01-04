import * as React from "react";
import { DataContext } from "../../contexts/data.context";

function SignIn() {

    const {error} = React.useContext(DataContext);
    console.log(error)

    return (<>
        <form action="" method="post" className="flex flex-col justify-center h-full m-auto md:w-3/6 align-center">
            <h3 className="font-medium text-2xl pb-3">Sign In</h3>

            {error && <div className="bg-rose-200 p-3 rounded my-3">{error}</div>}

            <div className="w-full mb-5">
                <label htmlFor="email" className="my-2">Email</label>
                <input type="email" name="email" id="email" className="rounded px-4 py-3 w-full" />
            </div>

            <div className="w-full mb-5">
                <label htmlFor="password" className="my-2">Password</label>
                <input type="password" name="password" id="password" className="rounded px-4 py-3 w-full" />
            </div>

            <div className="w-full mb-5">
                <button className="button bg-blue-900 text-white rounded py-2 px-4">Sign In</button>
            </div>
        </form>
    </>);
}

export default SignIn;
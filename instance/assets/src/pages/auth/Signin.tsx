import * as React from "react";
import { DataContext } from "../../contexts/data.context";

function SignIn() {

    const {data} = React.useContext(DataContext);
    const {error} = data || {}

    return (<>
        <form action="" method="post" className="flex flex-col justify-center h-full m-auto md:w-3/6 align-center">
            <h3 className="font-medium text-2xl pb-3">Sign In</h3>

            {error && <div className="bg-rose-200 p-3 rounded my-3">{error}</div>}

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" />
            </div>

            <div className="form-group">
                <button className="btn-primary">Sign In</button>
            </div>
        </form>
    </>);
}

export default SignIn;
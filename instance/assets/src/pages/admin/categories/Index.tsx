import * as React from "react";
import MVC from "../../../components/mvc";
import { Column } from "../../../components/mvc/@types";

function Categories() {

    const params = location.pathname.split("/").slice(3);
    const action: any = params[0] || "list";

    const columns: Column[] = [
        {
            title: "Image",
            name: "img_url",
            attr: {
                type: "file"
            }
        },
        {
            title: "Name",
            name: "name",
            label: "Category Name",
            attr: {
                type: "text",
                required: true
            }
        },
        {
            title: "Description",
            name: "description",
            label: "Description",
            attr: {
                type: "textarea",
                className: "",
                rows: 3,
                required: true
            }
        }
    ];

    const header = <div>
        <h3 className="text-3xl font-bold mb-4">Categories</h3>
        <p>Manage the categories</p>
    </div>

    return (<>
        <MVC resourceTitle="Category" resource="categories"
            addEditTarget="modal"
            {...{ columns, action, header }} />
    </>);
}

export default Categories;
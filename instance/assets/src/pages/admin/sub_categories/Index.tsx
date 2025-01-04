import * as React from "react";
import MVC from "../../../components/mvc";
import { Column } from "../../../components/mvc/@types";

function SubCategories() {

    const params = location.pathname.split("/").slice(3);
    const action: any = params[0] || "list";

    const columns: Column[] = [
        // {
        //     title: "Image",
        //     name: "img_url",
        //     attr: {
        //         type: "file"
        //     }
        // },
        {
            title: "Name",
            name: "name",
            label: "Name",
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
        },
        {
            title: "Category",
            name: "category_id",
            label: "Category",
            resource: "categories",
            resourceSingular: "category",
            valuefield:"id",
            textfield:"name",
            attr: {
                type: "select",
                className: "",
                rows: 3,
                required: true
            }
        }
    ];

    const header = <div>
        <h3 className="text-3xl font-bold mb-4">Sub Categories</h3>
        <p>Manage the sub categories</p>
    </div>

    return (<>
        <MVC resourceTitle="Sub Category" resource="sub_categories"
            addEditTarget="modal"
            {...{ columns, action, header }} />
    </>);
}

export default SubCategories;
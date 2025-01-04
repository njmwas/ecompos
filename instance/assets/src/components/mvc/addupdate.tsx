import * as React from "react";
import { Column } from "./@types";
import FormField from "./FormField";
import { create } from "../../lib/api.service";
import { useLocation, useParams } from "react-router";
import { DataContext } from "../../contexts/data.context";

interface AddUpdateProps {
    resource: string,
    resourceTitle: string,
    columns: Column[],
    defaultFormData?: any,
    id?: string,
    requestType?: "xhr" | "ssr",
    onSave?: () => void
}

function AddUpdate({
    resourceTitle,
    resource,
    columns,
    defaultFormData,
    id,
    requestType = "ssr",
    onSave
}: AddUpdateProps) {

    const location = useLocation();
    const { action = "add" } = useParams();
    const { data } = React.useContext(DataContext);
    const dt = data!.data || defaultFormData;
    const defaults = columns.reduce((a: any, b) => {
        a[b.name] = dt ? dt[b.name] : "";
        return a;
    }, {});
    const [formData, setFormData] = React.useState({ ...defaults, ...(dt && "id" in dt && { id: dt.id }) });
    const { error, message } = data || {}
    const [info, setInfo] = React.useState({ error, message })

    function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({
            ...formData,
            [evt.currentTarget.name]: evt.currentTarget.value
        })
    }

    function handleSubmit(evt: React.SyntheticEvent) {
        const form = evt.target as HTMLFormElement;
        let fd = formData;
        if (requestType === "xhr") {
            evt.preventDefault();
            if (!id) {
                const headers: any = {}
                const fileFields = columns.filter(c => 'type' in c.attr && c.attr.type === 'file');
                if (fileFields) {
                    fd = new FormData(form);
                    fileFields.forEach(fileField => {
                        const files: FileList = form[fileField.name].files;
                        for (let i = 0; i < files.length; i++) {
                            fd.append('files', files[i], files[i].name)
                        }
                    });
                    headers["X-Requested-With"] = true
                }

                create(`/${resource}`, fd, headers)
                    .then(({ data: { data, message, error } }) => {
                        setFormData(columns.reduce((a: any, b) => {
                            a[b.name] = data[b.name];
                            return a;
                        }, { id: data.id }));
                        setInfo({ error, message });
                        onSave();
                    })
                    .catch(e => {
                        setInfo(JSON.parse(e.message))
                    })
            }
        }
    }

    return (<>
        <form action={`/${resource}?after=${location.pathname}`}
            method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">

            <h3 className="text-2xl font-bold mb-4">
                {action[0].toUpperCase()}{action.substring(1)} {resourceTitle}</h3>

            <p>Enter the following details.<br />Fields marked with <strong>*</strong> are compulsory</p>

            {info.error && <div className="rounded bg-rose-200 p-5 my-3">{info.error}</div>}
            {info.message && <div className="rounded bg-green-200 p-5 my-3">{info.message}</div>}

            {columns.map(column => <div key={column.name} className="form-group w-full">
                {column.label && <label htmlFor={column.attr.id}>{column.label}{column.attr.required && " *"}</label>}
                {id || formData.id && <input type="hidden" name="id" defaultValue={id || formData.id} />}
                <FormField {...column.attr}
                    className={`form-control w-full 
                    ${column.attr.className}`}
                    name={column.name}
                    {...("type" in column.attr && column.attr.type !== "file" ? {
                        value: formData[column.name]
                    } : {})}
                    onChange={handleChange}
                    {...("type" in column.attr && column.attr.type === 'select' ? {
                        valuefield: column.valuefield,
                        textfield: column.textfield,
                        resource: column.resource
                    } : {})} />
            </div>)}
            <div className="form-group">
                <button className="btn btn-lg btn-primary">Save</button>
            </div>
        </form>
    </>);
}

export default AddUpdate;
import * as React from "react";
import { get } from "../../lib/api.service";

interface InputFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { }
interface TextareaFormFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }
interface SelectFormFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    resource?: string,
    valuefield?: string,
    textfield?: string
}
interface FileFieldEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget
}

function FormField(props: InputFormFieldProps | TextareaFormFieldProps | SelectFormFieldProps) {

    const custom = ['radio', 'checkbox', 'textarea', 'file', 'select'];
    const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
    const textareaProps = props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    const selectProps = props as React.SelectHTMLAttributes<HTMLSelectElement>;
    const [files, setFiles] = React.useState<FileList>();

    return (<>
        {!custom.includes(inputProps.type) && <input {...inputProps} />}
        {inputProps.type === 'textarea' && <textarea {...textareaProps}></textarea>}
        {inputProps.type === 'file' && <FileField {...inputProps} files={files}>
            <input {...inputProps} onChange={(evt: FileFieldEvent) => setFiles(evt.target.files)} />
        </FileField>}
        {inputProps.type == "select" && <SelectField {...selectProps} />}
    </>);
}

interface FileFieldProps extends InputFormFieldProps {
    files?: FileList
}

function FileField({ children, files, ...props }: FileFieldProps) {
    const [src, setSrc] = React.useState<string | ArrayBuffer>("");

    React.useEffect(() => {
        const fileReadPromises: Promise<string | ArrayBuffer>[] = [];
        if (files) {
            for (let i = 0; i < files.length; i++) fileReadPromises.push(new Promise((rs: (url: string | ArrayBuffer) => void, rj) => {
                const fr = new FileReader();
                fr.onload = evt => rs(evt.target.result)
                fr.readAsDataURL(files.item(i));
            }));
        }
        Promise.all(fileReadPromises).then((imgSrcs: string[] | ArrayBuffer[]) => setSrc(imgSrcs[0]))
    }, [files]);

    return (<div className="form-control">
        {children}
        {src && <img src={src as string}
            className="w-full h-64"
            style={{ objectFit: "contain" }} />}
    </div>);
}

function SelectField({ resource, valuefield, textfield, ...props }: SelectFormFieldProps) {
    const [resourceData, setResourceData] = React.useState([]);
    React.useEffect(() => {
        get(`/${resource}`).then(({ data }) => {
            setResourceData(data[resource] || []);
        })
    }, []);

    const selectFieldPorps = props as React.SelectHTMLAttributes<HTMLSelectElement>

    return (<>
        <select {...selectFieldPorps}>
            <option value={""}></option>
            {resourceData.map(item => <option key={item.id} value={item[valuefield]}>{item[textfield]}</option>)}
        </select>
    </>);
}

export default FormField;
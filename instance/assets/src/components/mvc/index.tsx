import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import List from "./list";
import AddUpdate from "./addupdate";
import { Column } from "./@types";
import { get } from "../../lib/api.service";
import Modal from "../modal";



interface MVCProps {
    resource: string,
    pageTitle?: string,
    action: 'list' | 'add' | 'update',
    columns: Column[],
    addEditTarget?: "parent" | "modal",
    header?: React.ReactNode,
    resourceTitle:string
}

function MVC({
    resource,
    columns = [],
    action = "list",
    pageTitle,
    addEditTarget = "parent",
    header,
    resourceTitle
}: MVCProps) {

    const location = useLocation();
    const [data, setData] = React.useState([]);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        get(`/${resource}`).then(response => {
            setData(response.data[resource] || []);
        });
    }, []);

    function handleEdit(item:any){
        setSelectedItem(item);
        if(addEditTarget === 'modal'){
            setModalIsOpen(true);
        }
        else{
            navigate(`${location.pathname}/update`)
        }
    }

    return (<>{action === 'list' ? <>
        <div className={`flex py-3 my-5 items-start ${addEditTarget === 'modal' && 'relative'}`}>
            {pageTitle && <h3 className="text-3xl font-bold">{pageTitle}</h3>}
            {header}
            {addEditTarget == "parent" && <a href={`${location.pathname}/add`} className="ms-auto btn btn-lg btn-primary">
                <i className="bi bi-plus" /> {resourceTitle}</a>}
            {addEditTarget == "modal" && <>
                <button className="ms-auto btn btn-lg btn-primary" onClick={()=>setModalIsOpen(!modalIsOpen)}>
                    <i className="bi bi-plus" /> {resourceTitle}
                </button>
                {modalIsOpen && <Modal onClose={()=>setModalIsOpen(!modalIsOpen)}>
                    <AddUpdate {...{ columns, resource, resourceTitle }} defaultFormData={selectedItem} requestType="xhr" />
                </Modal>}
            </>}
        </div>
        <List {...{ columns, data, handleEdit }} />
    </> : <AddUpdate {...{ columns, resource, resourceTitle }} defaultFormData={selectedItem} />}</>);
}

export default MVC;
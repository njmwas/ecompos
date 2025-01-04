import * as React from "react";
import { useLocation } from "react-router";
import { Column } from "./@types";
import useQueryParams from "../../hooks/useQueryParams";

interface ListProps {
    columns: Column[],
    data: any[],
    handleEdit?: (data?:any)=>void
}

function List({ columns, data = [], handleEdit }: ListProps) {

    const location = useLocation();
    const qparams = useQueryParams();

    return (<table className="table table-auto w-full">
        <thead>
            <tr>
                {columns.map(column => <th key={column.name}>{column.title}</th>)}
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? data.map((row, i) => <tr key={row.id}>
                {columns.map(column => <td key={`${column.name}${row.id}`}
                    className={`${i % 2 && 'bg-gray-50'}`}>
                    {"type" in column.attr && column.attr.type === 'select' ? row[column.resourceSingular][column.textfield] : row[column.name]}
                </td>)}
                <td className={`${i % 2 && 'bg-gray-50'}`}>
                    <button className="btn btn-info" onClick={()=>handleEdit(row)}>
                        <i className="bi bi-pencil" />  Edit
                    </button>
                </td>
            </tr>) : <tr>
                <td colSpan={columns.length+1}>No Data</td>
            </tr>}
        </tbody>
    </table>);
}

export default List;
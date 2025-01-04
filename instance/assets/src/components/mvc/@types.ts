import * as React from "react";

export interface Column {
    title: string,
    name: string,
    label?: string,
    resource?: string,
    resourceSingular?: string,
    valuefield?: string,
    textfield?: string,
    attr?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>
}
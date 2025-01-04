async function handleResponse(response: Response) {
    if (response.status >= 200 && response.status < 300) return response.json();
    await response.json().then(err => {
        throw new Error(JSON.stringify(err.data))
    });
}

export function get(resource: string) {
    return fetch(resource, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(handleResponse);
}

export function create(resource: string, data: any, headers:any = {"Content-Type": "application/json"}) {
    return fetch(resource, {
        method: "POST",
        body: headers["Content-Type"] === "application/json" ? JSON.stringify(data) : data,
        headers
    }).then(handleResponse);
}

export function update(resource: string, data: any, headers:any = {"Content-Type": "application/json"}) {
    return fetch(resource, {
        method: "PATCH",
        body: headers["Content-Type"] === "application/json" ? JSON.stringify(data) : data,
        headers
    }).then(handleResponse);
}
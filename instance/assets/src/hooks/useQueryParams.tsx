import { useLocation } from "react-router";

function useQueryParams() {
    const location = useLocation();
    const qparams = location.search.substring(1).split("&")
        .reduce((a, b) => ({ ...a, [b.split("=")[0]]: b.split("=")[1] }), {});
    return qparams;
}

export default useQueryParams;
import { handleUpload, handleDownload, } from "./request-handler.js";
export const ROUTES = {
    "/file": {
        method: "GET",
        "handle-req": handleDownload,
    },
    "/upload": {
        method: "POST",
        "handle-req": handleUpload,
    },
};
//# sourceMappingURL=router.js.map
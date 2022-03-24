import { createServer } from 'http';
import { getAll, getById } from "./Employees";
function parseURLParams(paramsString) {
    const params = new URLSearchParams(paramsString);
    return Array.from(params.entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
const server = createServer(async(req, res) => {
    const [path, paramsString] = req.url.split("?");

    if( path === "/api/Employees") {
        const params = parseURLParams(paramsString);
    
        const { code, data} = await getAll(params);

        res.writeHead(code, { "Content-Type": "application/json" });
        res.end(data);
    } else if(path.match(/\/api\/Employees\/\w+/)) {
         const id = path.split("/")[3];

         const { code, data } = await getById(id);

         res.writeHead(code, {"Content-Type" : "application/json"});
         res.end(data);
    } else {
        res.writeHead(404,{"Content-Type" : "application/json"} )
        res.end('ROUTER NOT FOUND!')
    }
    
})
newFunction();
function newFunction() {
    server.listen(8888);
}


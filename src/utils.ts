import { pool } from "./storage";
import { Website } from "./models/website";

function domainsExist(domains: Array<string>, idaccount: string) {
    pool.query("SELECT * FROM WEBSITE WHERE idaccount=?", [idaccount], (err, result) => {
        if (err) {
            return false;
        }
        console.log(result);
        return false;
    })
    return false;
}

export {
    domainsExist
}
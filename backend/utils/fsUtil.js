import * as fs from 'fs'

const readFile = (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error occurred while reading sql file: ${err}`);
            return;
        }
    })
    return sql
}

export { readFile }
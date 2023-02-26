import pool from '../config/db.js'

const query = (sqlQuery, [data]) => {
    console.log([data])
    pool.query(sqlQuery, [data], (err, res) => {
        if (err) {
            console.log(`Error occured while interacting with employeeDB : ${err}`)
            return
        }
        res.status(200).send()
    })
}

export { query }
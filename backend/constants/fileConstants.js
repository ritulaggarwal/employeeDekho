import * as path from 'path'

const fileConstants = Object.freeze({
    FILE_PATH_PREFIX: path.join(process.cwd(), 'backend', 'dao', 'sql')

})

export { fileConstants }
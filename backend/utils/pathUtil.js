import * as path from 'path'
import { fileConstants } from '../constants/fileConstants.js'

const joinPath = (fileName) => {
    const prefixFilePath = fileConstants.FILE_PATH_PREFIX
    const filePath = path.join(prefixFilePath, fileName).toString()
    return filePath
}

export { joinPath }
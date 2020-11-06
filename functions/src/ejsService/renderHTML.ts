import ejs from 'ejs';
import { join } from 'path';

export const renderHTML = async(path: string, data: any): Promise<string> => {
    try {
        return await ejs.renderFile(join(__dirname, path), data);
    } catch(err) {
        throw new Error(`Error while rendering HTML from ejs file: ${err}`)
    }
}
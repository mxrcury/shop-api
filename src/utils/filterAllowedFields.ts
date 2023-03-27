import { RestFields } from "../types/common"

export default (fields:RestFields<string | number | boolean | null>, allowedFields: RestFields<string | number | boolean | null>) => {
    const updateFields = {}
    Object.keys(fields).forEach(field => {
        if(field in allowedFields) {
            updateFields[field] = fields[field]
        }
    })
    return updateFields
}
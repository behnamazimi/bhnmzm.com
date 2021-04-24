export default function isValidJSONString(json) {
    try {
        JSON.parse(json)
        return true
    } catch (e) {
        return false
    }
}
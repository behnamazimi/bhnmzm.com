export default function isValidJSON(json) {
    try {
        JSON.stringify(json)
        return true
    } catch (e) {
        return false
    }
}
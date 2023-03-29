export default (match) => {
    const regex = { $regex:'.*', $options: 'i'}
    if (match.trim().length) {
        regex.$regex = match
    }
    return regex
}
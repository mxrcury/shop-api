export default (match) => {
    const regex = { $regex:'.*', $options: 'i'}
    if (match.length && match.trim().length) {
        regex.$regex = match
    }
    return regex
}

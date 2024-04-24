// get works from DataBase
async function getworks() {
    try {
        const worksDB = await fetch('http://localhost:5678/api/works')
        const works = await worksDB.json()
        return works
    } catch (error) { window.alert(error)}
}
// get Categoriers from DataBase
async function getCategories() {
    try {
        const categoriesDB = await fetch('http://localhost:5678/api/categories')
        const categories = await worksDB.json()
        return categories
    } catch (error) { window.alert(error)}
}
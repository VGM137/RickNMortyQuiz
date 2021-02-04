const API = 'https://rickandmortyapi.com/api/character/'

const getData = async () => {
  const apiURL = API
  const pages = 34
  const urls = []
  for(let i = 1; i <= pages; i++){
    let url = `${apiURL}?page=${i}`
    urls.push(url)
  }
  try{
    const response = Promise.all(urls.map((url) =>
      fetch(url).then(resp => resp.json())
      ))
    const data = await response
    
/*     let characters = pages.forEach(function(page){page.map(function(character){
      allCharacters.push(character)
      })
    }) */
    return data
  } catch (error) { 
    console.log('Fetch Error', error)
  }
}

export default getData
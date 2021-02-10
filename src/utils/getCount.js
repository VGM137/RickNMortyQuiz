const API = 'https://rickandmortyapi.com/api/character/'

const getData = async () => {
  const apiURL = API
  try{
    const response = await fetch(apiURL)
    const data = await response.json()
    return data
  }catch(error) { 
    console.log('Fetch Error', error)
  }
}

export default getData
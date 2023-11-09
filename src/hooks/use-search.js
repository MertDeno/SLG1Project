const useSearch = (event, url, countUrl, setList, setListLength, setCount, setSearchValue, param) => {
    
    const onSearch = async() => {
      debugger
      
      let valueToSearch = event.current.target.value 
      setSearchValue(valueToSearch)
      valueToSearch.trim().length === 0 && setListLength(0)
      let response;
    /*
        const responseSubObjectCount = await fetch(countUrl, {
          method: 'POST',
          body: JSON.stringify({
            object: param.toUpperCase(),
            subobject: subObjToSearch.toUpperCase(),
          }),
          headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
          }            
        })
    
        const subObjectCountRes = await responseSubObjectCount.json()
        setCount(subObjectCountRes.subObjectCount)
    */
      if(url === "http://localhost:8080/ObjectEntitySet"){
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            object: valueToSearch.toUpperCase(),
        //    subobject: valueToSearch.toUpperCase(),
            topValue: 20
          }),
          headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
          }
        })
      }
      else if(url === "http://localhost:8080/SubObjectEntitySet"){
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            object: param,
            subobject: valueToSearch.toUpperCase(),
            topValue: 20
          }),
          headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
          }
        })            
      }
      else if(url === "http://localhost:8080/UserSet"){
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            user: valueToSearch.toUpperCase()
          }),
          headers: {
            'Content-Type':'application/json',
            Accept:'application/json'
          }
        })          
      }
  
      var result = await response.json()
      setList(result)
      setListLength(result.length)  
      setCount()
    }    

    return {
      onSearch
    }
}

export default useSearch
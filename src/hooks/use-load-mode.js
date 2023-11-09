const useLoadMore = (url, countUrl, searchValue, listLength, setList, setListLength, setCount, objectValue) => {
    
    const handleOnLoadMore = async() => {
        debugger
        var responseCount;
        var response;

        if(url === "http://localhost:8080/ObjectEntitySet"){
            responseCount = await fetch(countUrl, {
                method: 'POST',
                body: JSON.stringify({
                  object: searchValue.toUpperCase(),
                }),
                headers: {
                  'Content-Type':'application/json',
                  Accept:'application/json'
                }            
            })
        }
        else if(url === "http://localhost:8080/SubObjectEntitySet"){
            responseCount = await fetch(countUrl, {
                method: 'POST',
                body: JSON.stringify({
                  object: objectValue.toUpperCase(),
                  subobject: searchValue.toUpperCase(),
                }),
                headers: {
                  'Content-Type':'application/json',
                  Accept:'application/json'
                }            
              })            
        }
        else if(url === "http://localhost:8080/UserSet"){
            responseCount = await fetch(countUrl)
        }
      
        const countRes = await responseCount.json()
        setCount(countRes.count)

        if(url === "http://localhost:8080/ObjectEntitySet"){
            response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  skipValue: 0,
                  topValue: countRes.count - listLength >= 20 ? listLength + 20 : (countRes.count - listLength) + 20,
                  object: searchValue.toUpperCase()
                }),
                headers: {
                  'Content-Type':'application/json',
                  Accept:'application/json'
                }      
            })
        }
        else if(url === "http://localhost:8080/SubObjectEntitySet"){
            response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  object:objectValue.toUpperCase(),
                  skipValue: 0,
                  subobject: searchValue.toUpperCase(),
                  topValue: countRes.count - listLength >= 20 ? listLength + 20 : (countRes.count - listLength) + 20
                }),
                headers: {
                  'Content-Type':'application/json',
                  Accept:'application/json'
                }      
              })            
        }
        else if(url === "http://localhost:8080/UserSet"){
            response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  skipValue: 0,
                  topValue: listLength + 20
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
    }

    return {
        handleOnLoadMore
    }
}

export default useLoadMore
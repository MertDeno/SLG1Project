const useLogClassDecision = (logClassText, setLogClass) => {

    const selectionLogClass = () => {
    if(logClassText === "Only very important logs"){
            setLogClass(1)
        }
        else if(logClassText === "Only important logs"){
            setLogClass(2)
        }
        else if(logClassText === "Also less important logs"){
            setLogClass(3)
        }
        else{
            setLogClass(4)
        }
    }

    return {
        selectionLogClass
    }
}   

export default useLogClassDecision
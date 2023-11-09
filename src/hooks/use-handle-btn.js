const useHandleBtnClick = (item, setItem) => {
    
    const handleBtnClick = () => {
        debugger
        setItem(item)
    }

    return {
        handleBtnClick
    }
}

export default useHandleBtnClick
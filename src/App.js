import { useEffect, useRef, useState } from 'react';
import {
  FlexBox,
  ShellBar,
  SelectDialog,
  DateTimePicker,
  FilterBar,
  FilterGroupItem,
  ComboBox,
  ComboBoxItem,
  StandardListItem,
  Input,
  Icon,
  BusyIndicator,
  Text,
  AnalyticalTable,
  ValueState,
  Card
} from '@ui5/webcomponents-react';
import './App.css';
import "@ui5/webcomponents-icons/dist/value-help"
import "@ui5/webcomponents-icons/dist/message-success"
import "@ui5/webcomponents-icons/dist/message-error"
import moment from 'moment/moment';
import useLoadMore from './hooks/use-load-mode';
import useSearch from './hooks/use-search';
import useHandleBtnClick from './hooks/use-handle-btn';
import ListItem from '@ui5/webcomponents/dist/ListItem';


function App() {
  const [objDialogOpened, setObjDialogOpened] = useState(false)
  const [subObjDialogOpened, setSubObjObjDialogOpened] = useState(false)
  const [userDialogOpened, setUserDialogOpened] = useState(false)
  
  const [userCount, setUserCount] = useState(0)
  const [objectCount, setObjectCount] = useState(0)
  const [subObjectCount, setSubObjectCount] = useState(0)
  
  const [objectList, setObjectList] = useState([])
  const [objectListLength, setObjectListLength] = useState(0)

  const [subObjectList, setSubObjectList] = useState([])
  const [subObjectListLength, setSubObjectListLength] = useState(0)

  const [userList, setUserList] = useState([])
  const [userListLength, setUserListLength] = useState(0)

  const [resultList, setResultList] = useState([])
  const [resultListLength, setResultListLength] = useState([])

  const [messageList, setMessageList] = useState([])
 // const [resultListLength, setResultListLength] = useState([])

  const today = new Date()
  
  const [objValue, setObjValue] = useState('')
  const [logNumberValue, setLogNumberValue] = useState(0)
  const [subObjValue, setSubObjValue] = useState('')
  const [userValue, setUserValue] = useState('')
  const [logClassValue, setLogClassValue] = useState(4)
  const [logOperationValue, setLogOperationValue] = useState('*')
  const [dateFrom, setDateFrom] = useState(moment(today).format('MMM D, Y 00:00:00'))
  const [dateTo, setDateTo] = useState(moment(today).format('MMM D, Y HH:mm:ss'))

  console.log(today)

  const [objValueEntered, setObjValueEntered] = useState(false)
  const [subObjValueEntered, setSubObjValueEntered] = useState(false)
  const [userValueEntered, setUserValueEntered] = useState(false)

  const [searchValue, setSearchValue] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)


  const objRef = useRef('')
  const subObjRef = useRef('')
  const userRef = useRef('')

  const objectUrl = 'http://localhost:8080/ObjectEntitySet'
  const subObjectUrl = 'http://localhost:8080/SubObjectEntitySet'
  const userUrl = 'http://localhost:8080/UserSet'
  const userCountUrl = 'http://localhost:8080/UserSetCount'
  const objectCountUrl = 'http://localhost:8080/ObjectEntityCountSet'
  const subObjectCountUrl = 'http://localhost:8080/SubObjectEntityCountSet'
  const resultUrl = 'http://localhost:8080/ResultSet'

  const { handleOnLoadMore: handleOnLoadMoreObject } = useLoadMore(objectUrl, objectCountUrl, searchValue, objectListLength, setObjectList, setObjectListLength, setObjectCount, '')
  const { handleOnLoadMore: handleOnLoadMoreUser } = useLoadMore(userUrl, userCountUrl, searchValue, userListLength, setUserList, setUserListLength, setUserCount, '')
  const { handleOnLoadMore: handleOnLoadMoreSubObject } = useLoadMore(subObjectUrl, subObjectCountUrl, searchValue, subObjectListLength, setSubObjectList, setSubObjectListLength, setSubObjectCount, objValue)

  const { onSearch: onSearchObject } = useSearch(objRef, objectUrl, objectCountUrl, setObjectList, setObjectListLength, setObjectCount, setSearchValue, objValue)
  const { onSearch: onSearchUser } = useSearch(userRef, userUrl, userCountUrl, setUserList, setUserListLength, setUserCount, setSearchValue, userValue)
  const { onSearch: onSearchSubObject } = useSearch(subObjRef, subObjectUrl, subObjectCountUrl, setSubObjectList, setSubObjectCount, setSubObjectCount, setSearchValue, objValue)

  const setObjBtnClicked = () => {
    debugger
    setObjDialogOpened(!objDialogOpened)
    objDialogOpened === true && setSearchValue('')
    fetchApi()
  }

  const setUserBtnClicked = () => {
    debugger
    setUserDialogOpened(!userDialogOpened)
  }

  const fetchApi = async() => {
    debugger
    const response = await fetch(objectUrl)
    const responseUserCount = await fetch(userCountUrl)

    const result = await response.json()
    const userCountRes = await responseUserCount.json()

    setUserCount(userCountRes.userCount)
    setObjectList(result)
    setObjectListLength(result.length)
  }

  const handleBtnClickSubobj = (e) => {
    debugger
    setSubObjValue(e.Subobject)
  }

  const handleBtnClickUser = (e) => {
    debugger
    setUserValue(e.Bname)
  }

  const handleBtnClickObject = (e) => {
    debugger
    setObjValue(e.Object)
    setSubObjValue('')
    setObjValueEntered(true)
  }

  const onInputChange = (e) => {
    debugger
   // let objectValue = e.target.value
    const objFound = objectList.find((item) => item.Object === e.target.value.toUpperCase() ) 
    !objFound ? (setObjValueEntered(false) && setSubObjValue(e.target.value)) : setObjValueEntered(true)
    objFound ? setObjValue(objFound.Object) : setObjValue('')
  }

  const onSubObjInputChange = (e) => {
    debugger
   // let objectValue = e.target.value
    const subObjFound = subObjectList.find((item) => item.Object === e.target.value.toUpperCase() ) 
    !subObjFound ? (setSubObjValueEntered(false) && setSubObjValue(e.target.value)) : setSubObjValueEntered(true)
    subObjFound ? setSubObjValue(subObjFound.Object) : setSubObjValue('')
  }

  const onUserInputChange = (e) => {
    debugger
   // let objectValue = e.target.value
    const userFound = userList.find((item) => item.Bname === e.target.value.toUpperCase() ) 
    !userFound ? (setUserValueEntered(false) && setUserValue('')) : setUserValueEntered(true)
    userFound ? setUserValue(userFound.Bname) : setUserValue('')
  }

  const onSelectSubObject = () => {
    setSubObjObjDialogOpened(!subObjDialogOpened)
  }

  const onSelectUser = async() => {
    debugger
    const response = await fetch(userUrl)

    const result = await response.json()
    setUserList(result)
    setUserListLength(result.length)
  }

  const onSelectSubObject2 = async() => {
    debugger

    setIsLoading(true)
    const response = await fetch(subObjectUrl, {
      method: "POST",
      body: JSON.stringify({
        object: objValue.toUpperCase()
      }),
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      }
    })

    var result = await response.json()
    setSubObjectList(result)
    setSubObjectListLength(result.length)
    setIsLoading(false)
  }

  const searchObject = (item) => {
    debugger
    objRef.current = item
    onSearchObject()
  }

  const searchUser = (item) => {
    debugger
    userRef.current = item
    onSearchUser()
  }

  const searchSubObject = (item) => {
    debugger
    subObjRef.current = item
    onSearchSubObject()
  }

  const selectionLogClass = (item) => {
    debugger
    if(item.detail.item._state.text === "Only very important logs"){
      setLogClassValue(1)
    }
    else if(item.detail.item._state.text === "Only important logs"){
      setLogClassValue(2)
    }
    else if(item.detail.item._state.text === "Also less important logs"){
      setLogClassValue(3)
    }
    else{
      setLogClassValue(4)
    }
  }

  const selectionLogOperation = (item) => {
    debugger
    if(item.detail.item._state.text === "Batch Input"){
      setLogOperationValue('I')
    }
    else if(item.detail.item._state.text === "Dialog"){
      setLogOperationValue('D')
    }
    else if(item.detail.item._state.text === "In Batch Mode"){
      setLogOperationValue('B')
    }
    else{
      setLogOperationValue('*')
    }
  }

  const filterLogs = async(item) => {
    debugger
    
    setIsLoading(true)
    const response = await fetch(resultUrl, {
      method: "POST",
      body: JSON.stringify({
        object: objValue.toUpperCase(),
        subobject: subObjValue.toUpperCase(),
        logClass : logClassValue,
        logOperation: logOperationValue,
        datefrom: moment(dateFrom).format('YYYY-MM-DD'),
        dateto: moment(dateTo).format('YYYY-MM-DD'),
        timefrom: 'PT'+moment(dateFrom).format('HH')+'H'+moment(dateFrom).format('mm')+'M'+moment(dateFrom).format('mm')+'S',
        timeto: 'PT'+moment(dateTo).format('HH')+'H'+moment(dateTo).format('mm')+'M'+moment(dateTo).format('mm')+'S',
        user: userValue,
        topValue: resultList.length === 0 ? 20 : 20 + resultList.length
      }),
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      }
    })   

    var result = await response.json()
    console.log(result)
    result.error === undefined ? setResultList(result) : setResultList([])
    result.error === undefined && setResultListLength(result.length)
    result.error !== undefined && setIsPopoverOpen(false)
    result.error !== undefined && setMessageList([])
    setIsLoading(false)
  }

  const onChangeDateFrom = (date) => {
    debugger
    setDateFrom(date.detail.value)
  }
  
  const onChangeDateTo = (date) => {
    debugger
    setDateTo(date.detail.value)
  }

  const onLogClicked = async(item) => {
    debugger
    
    const response = await fetch(resultUrl, {
      method: "POST",
      body: JSON.stringify({
        logNumber: item.detail.row.original.logNumber,
        topValue: messageList.length === 20 ? 20 : messageList.length + 20
      }),
      headers: {
        'Content-Type':'application/json',
        Accept:'application/json'
      }
    })
    
    var result = await response.json()
    setMessageList(result.results)
    setLogNumberValue(item.detail.row.original.logNumber)
    setIsPopoverOpen(true)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <ShellBar primaryTitle="Application Log Analysis of SAP Systems" logo={<img src="https://sap.github.io/ui5-webcomponents/assets/images/sap-logo-svg.svg"/>} />
      <FilterBar children="Object" showGoOnFB onGo={filterLogs} showResetButton>
        <FilterGroupItem label='Object'>
          <FlexBox>
              <Input onInput={onInputChange} value={objValue} placeholder='Select Object' icon={<Icon style={{display:'flex'}} onClick={() => setObjBtnClicked()} name='value-help' interactive />}/>
              <SelectDialog growing={(objectListLength >= 20) && (objectListLength !== objectCount) ? 'Button' : 'None'} showClearButton style={{width:"0%"}} onSearchInput={(item) => searchObject(item)}
                onBeforeClose={setObjBtnClicked} open={objDialogOpened} headerText='Select Object' mode='SingleSelect' onLoadMore={handleOnLoadMoreObject}>
                {objectList.map((item, key) => (
                  <StandardListItem onClick={() => handleBtnClickObject(item)} key={item+" "+key} description={item.Objtxt}>
                    {item.Object}
                  </StandardListItem>
                ))}
              </SelectDialog>
          </FlexBox>        
        </FilterGroupItem>
        <FilterGroupItem label='Subobject'>
          <FlexBox>
            <Input onInput={onSubObjInputChange} disabled={(!objValueEntered) ? true : false} value={subObjValue} placeholder='Select Sub-Object' 
              icon={<Icon style={{display:'flex'}} name='value-help' interactive onClick={() => onSelectSubObject()}/>}/>
            <SelectDialog style={{width:"0%"}} onAfterOpen={onSelectSubObject2} onBeforeClose={onSelectSubObject} open={subObjDialogOpened} onSearchInput={(item) => searchSubObject(item)}  
              headerText='Select Subobject' mode='SingleSelect' growing={(subObjectListLength >= 20) && (subObjectListLength !== subObjectCount) ? 'Button' : 'None'} onLoadMore={handleOnLoadMoreSubObject}>
              {isLoading && <BusyIndicator delay={5000} active />}
              {!isLoading && subObjectList.map((item, key) => (
                <StandardListItem onClick={() => handleBtnClickSubobj(item)} key={item+" "+key} description={item.Subobjtxt}>
                  {item.Subobject}
                </StandardListItem>
              ))}
              {subObjectListLength === 0 && <Text>No Data Found</Text>}
            </SelectDialog>
          </FlexBox>
        </FilterGroupItem>
        <FilterGroupItem label='From'>
          <FlexBox style={{flexDirection:"row"}}>
              <DateTimePicker maxDate={moment(today).format('MMMM D, Y')} value={dateFrom} onChange={(date) => onChangeDateFrom(date)} placeholder='From'/>
          </FlexBox>          
        </FilterGroupItem>
        <FilterGroupItem style={{flexDirection:"row", marginLeft:"30px"}} label='To'>
          <FlexBox>
            <DateTimePicker onChange={(date)=>onChangeDateTo(date)} maxDate={moment(today).format('MMMM D, Y')} value={dateTo} placeholder='To'/>
          </FlexBox>          
        </FilterGroupItem>
        <FilterGroupItem style={{flexDirection:"row", marginLeft:"30px"}} label='User'>
          <FlexBox>
            <Input onInput={onUserInputChange} placeholder='Select User' value={userValue} icon={<Icon style={{display:'flex'}} name='value-help' onClick={() => setUserBtnClicked()} interactive />}/>
            <SelectDialog growing={(userListLength !== userCount) && (userListLength >= 20) ? 'Button' : 'None'} showClearButton style={{width:"0%"}} 
              open={userDialogOpened} headerText='Select SAP User' mode='SingleSelect' onAfterOpen={onSelectUser} onLoadMore={handleOnLoadMoreUser}
              onSearchInput={(item) => searchUser(item)} onBeforeClose={setUserBtnClicked}>
              {userList.map((item, key) => (
                <StandardListItem onClick={() => handleBtnClickUser(item)} key={item+" "+key} description={item.Bname}>
                  {item.Bname}
                </StandardListItem>
              ))}
            </SelectDialog>            
          </FlexBox>        
        </FilterGroupItem>          
        <FilterGroupItem label='Log Class'>
          <ComboBox placeholder='Log Class' value="Any" onSelectionChange={(item) => selectionLogClass(item)}>
            <ComboBoxItem text='Only very important logs' />
            <ComboBoxItem text='Only important logs' />
            <ComboBoxItem text='Also less important logs' />
            <ComboBoxItem text='All logs' />
          </ComboBox>
        </FilterGroupItem>
        <FilterGroupItem label='Log Creation'>
          <ComboBox placeholder='Log Creation' value="All logs" onSelectionChange={(item) => selectionLogOperation(item)}>
            <ComboBoxItem text='Any' />
            <ComboBoxItem text='Dialog' />
            <ComboBoxItem text='In Batch Mode' />
            <ComboBoxItem text='Batch Input' />
          </ComboBox>
        </FilterGroupItem>
        <FilterGroupItem label='Log Source and Formatting'>
          <ComboBox placeholder='Log Source and Formatting' style={{width:"160%"}}>
            <ComboBoxItem text='Format Completely from Database' />
            <ComboBoxItem text='Format Only Header Data from Database' />
            <ComboBoxItem text='Format Completely from Archive' />
          </ComboBox>
        </FilterGroupItem>
      </FilterBar>
      <AnalyticalTable noDataText='No Data' onRowClick={(item) => onLogClicked(item)} stickyColumnHeader='false' groupable
        filterable sortable selectionMode='SingleSelect' infiniteScroll onLoadMore={filterLogs} loading={!isLoading ? false : true} 
        minRows={1} withRowHighlight highlightField={"status"} visibleRowCountMode='Fixed' infiniteScrollThreshold={20}
        visibleRows={10}
        columns={[
          {Header: 'Log Number', accessor:'logNumber'},
          {Header: 'Number', accessor: 'number'},
          {Header: 'Date/Time/User', accessor: 'dateTimeUser'},
          {Header: 'External ID', accessor: 'externalId'},
          {Header: 'Object Text', accessor: 'objtxt'},
          {Header: 'Subobject Text', accessor: 'subobjtxt'},
          {Header: 'Transaction Code', accessor:'altcode'},
          {Header: 'Program', accessor:'prg'},
          {Header: 'Mode', accessor:'mode'}]}
        data={resultList.map((item) => ({
          logNumber: item.LogNumber, 
          number: item.MsgCntAl, 
          dateTimeUser:moment(dateFrom).format('DD.MM.YYYY')+" "+item.Altime.replace('PT','').replace('H',':').replace('M',':').replace('S','')+" "+item.Aluser, 
          externalId: item.Extnumber,
          objtxt: item.Objtxt,
          subobjtxt: item.Subobjtxt,
          altcode: item.Altcode,
          prg: item.Alprog,
          mode: item.BalmodeTxt,
          status: (item.MsgCntE !== "000000" && ValueState.Error) || (item.MsgCntW !== "000000" && ValueState.Warning)|| (item.MsgCntS !== "000000" && ValueState.Success)
          }))}>
      </AnalyticalTable>
      {isPopoverOpen ? <Card style={{margin:"4rem", width:"90%"}}>  
        {isPopoverOpen && <h2 style={{textAlign:'center'}}>Display Logs - {logNumberValue}</h2>}
        {isPopoverOpen && 
          messageList.map((item, key) => (
            <Card style={{margin:"1rem", width:"97%"}}>
              <StandardListItem key={item+" "+key}>
                <div style={{display:'flex'}} >
                  <Icon className={item.MsgType === 'I' || item.MsgType === 'S' ? 'icon-message-success' : 'icon-message-error'} name={item.MsgType === 'I' || item.MsgType === 'S' ? 'message-success' : 'message-error'} /> 
                  <div style={{marginLeft:"0.5rem"}}>{item.MsgTxt}</div>
                </div>
              </StandardListItem>
            </Card>
          ))
        }
      </Card> : <></>}
    </>
  );
}

export default App;

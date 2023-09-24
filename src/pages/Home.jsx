import Layout from './../layouts/Layout'
import { useEffect,useState } from 'react';

// Data
import Paper from '../components/Molecules/Paper';
function Home({data,formatDate}) {
    const showFormattedDate = formatDate
    const [Data, setData] = useState(data);
    useEffect(()=>{
        sessionStorage.setItem('Data', JSON.stringify(data))
    },[])


    const Searching = (data) => {
        const dataSession = sessionStorage.getItem("Data");
        let temp = data
        let dataTemp = [];
        JSON.parse(dataSession).map((item) => {
            if (item.title.toLowerCase().includes(temp.toLowerCase())) {
                console.log("iniItem", item.title);
                console.log("inihasil", item);
                dataTemp.push(item);
            }
        });
        if(temp.toLowerCase().length === 0){
            setData(JSON.parse(dataSession));
            console.log('masuk1')
        }else{
            console.log("masuk2");
            setData(dataTemp);
        }

    }
     const Deleted = (data) => {
        const dataSession = sessionStorage.getItem("Data");
        console.log('inidataanak', data)
        let temp= data
        let dataTemp =[]
        JSON.parse(dataSession).map((item) => {
            if (item.id !== temp.item.id) {
                console.log("inihasil", [item]);
                dataTemp.push(item);
            }
        });
         sessionStorage.setItem('Data', JSON.stringify(dataTemp))
         setData(dataTemp)
        Searching(JSON.parse(sessionStorage.getItem("Search")));
        console.log('inidataTemp', dataTemp)
     };
       const archived = (data) => {
        console.log('inidataanak', data)
        const dataSession = sessionStorage.getItem("Data");
        let temp= data
        let dataTemp =[]
        JSON.parse(dataSession).map((item)=>{
            if(item.id === temp.item.id){
                console.log(item)
                if(item.archived === false){
                    item.archived = true
                }else{
                    item.archived = false
                }
                console.log('newdata', item)
            }
            dataTemp.push(item)
            console.log('inidatanew', dataTemp)
        })
        sessionStorage.setItem("Data", JSON.stringify(dataTemp));
        setData(dataTemp)
        console.log('inidataTemp', dataTemp)
        Searching(JSON.parse(sessionStorage.getItem("Search")));
     };

   
  return (
      <Layout dataSearching={Searching}>
          <h1 className='text-center'>Catatan Aktif</h1>
          <div className='my-5 p-5 bg-slate-300 mx-auto grid grid-cols-5 gap-5 w-fit'>
              <Paper readonly={false} />
              {Data &&
                  Data.filter((item) => item.id !== null && item.archived === false).map((res) => {
                      return (
                          <Paper
                              key={res.id}
                              id={res.id}
                              title={res.title}
                              createdAt={showFormattedDate(res.createdAt)}
                              body={res.body}
                              archived={res.archived}
                              dataDeleted={Deleted}
                              dataArchived={archived}
                              onchange={true}
                          />
                      );
                  })}
          </div>
          <br />
          <h1 className='text-center'>Catatan Archived</h1>
          <div className='my-5 p-5 bg-slate-300 mx-auto grid grid-cols-5 gap-5 w-fit'>
              {Data &&
                  Data.filter((item) => item.id !== null && item.archived === true).map((res) => {
                      return (
                          <Paper
                              key={res.id}
                              id={res.id}
                              title={res.title}
                              createdAt={showFormattedDate(res.createdAt)}
                              body={res.body}
                              archived={res.archived}
                              dataDeleted={Deleted}
                              dataArchived={archived}
                              onchange={true}
                          />
                      );
                  })}
          </div>
      </Layout>
  );
}

export default Home
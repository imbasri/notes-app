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

     const Deleted = (data) => {
        console.log('inidataanak', data)
        let temp= data
        let datacuy =[]
        Data.map((item)=>{
            if (item.id !== temp.item.id) {
                console.log("inihasil", [item]);
                datacuy.push(item)
            }
        })
         setData(datacuy)
        console.log('inidatacuy', datacuy)
     };
       const archived = (data) => {
        console.log('inidataanak', data)
        let temp= data
        let datacuy =[]
        Data.filter((item)=>{
            if(item.id === temp.item.id){
                console.log(item)
                if(item.archived === false){
                    item.archived = true
                }else{
                    item.archived = false
                }
                console.log('newdata', item)
            }
            datacuy.push(item)
            console.log('inidatanew', datacuy)
        })
        setData(datacuy)
        console.log('inidatacuy', datacuy)
     };

   
  return (
      <Layout>
          <h1 className='text-center'>Catatan Aktif</h1>
          <div className='my-5 p-5 bg-slate-300 mx-auto grid grid-cols-5 gap-5 w-fit'>
              <Paper readonly={false}  />
              {Data &&
                  Data.filter((item) => item.id !== null && item.archived === false).map(
                      (res) => {
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
                      }
                  )}
          </div>
          <br />
          <h1 className='text-center'>Catatan Archived</h1>
          <div className='my-5 p-5 bg-slate-300 mx-auto grid grid-cols-5 gap-5 w-fit'>
              {Data &&
                  Data.filter((item) => item.id !== null && item.archived === true ).map(
                      (res) => {
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
                      }
                  )}
          </div>
      </Layout>
  );
}

export default Home
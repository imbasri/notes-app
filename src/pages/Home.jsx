/* eslint-disable no-unused-vars */
import Layout from "./../layouts/Layout";
import { useEffect, useState } from "react";
// Data
import Paper from "../components/Molecules/Paper";
import Loading from "../components/Atoms/Loading";
import Modal from "../components/Molecules/Modal";
function Home({ data, formatDate }) {
    const showFormattedDate = formatDate;
    const [datas, setDatas] = useState(data);
    const [dataFalse, setDataFalse] = useState(data);
    const [dataTrue, setDataTrue] = useState(data);
    const [dataLoad, setDataLoad] = useState(true);
    useEffect(() => {
        sessionStorage.setItem("Data", JSON.stringify(data));
        firstLoad(data);
        setTimeout(() => {
            sessionStorage.setItem("Search", '""');
            setDataLoad(false);
        }, 2000);
    }, []);

    useEffect(() => {
          firstLoad(data);
    }, [data]);

    const Searching = (data) => {
        const dataArchived = sessionStorage.getItem("archived");
        const dataPindahkan = sessionStorage.getItem("pindahkan");
        let temp = data;
        let dataTrue = [];
        let dataFalse = [];

        JSON.parse(dataArchived).filter((item) => {
            if (item.title.toLowerCase().includes(temp?.toLowerCase())) {
                dataFalse.push(item);
            }
        });

        JSON.parse(dataPindahkan).map((item) => {
            if (item.title.toLowerCase().includes(temp?.toLowerCase())) {
                dataTrue.push(item);
            }
        });

        if (temp?.length === 0) {
            setDataTrue(JSON.parse(dataPindahkan));
            setDataFalse(JSON.parse(dataArchived));
        } else {
            setDataTrue(dataTrue);
            setDataFalse(dataFalse);
        }
    };
    const Deleted = (data) => {
        const dataArchived = sessionStorage.getItem("archived");
        const dataSearch = sessionStorage.getItem("Search");
        const dataPindahkan = sessionStorage.getItem("pindahkan");
        const dataAll = sessionStorage.getItem("Data");
        let temp = data;
        let dataTrue = [];
        let dataFalse = [];
        let dataTemp = [];

        JSON.parse(dataPindahkan).map((item) => {
            if (item.id !== temp.item.id) {
                dataTrue.push(item);
            }
        });

        JSON.parse(dataArchived).map((item) => {
            if (item.id !== temp.item.id) {
                dataFalse.push(item);
            }
        });
        JSON.parse(dataAll).map((item) => {
            if (item.id !== temp.item.id) {
                dataTemp.push(item);
            }
        });

        sessionStorage.setItem("pindahkan", JSON.stringify(dataTrue));
        sessionStorage.setItem("archived", JSON.stringify(dataFalse));
        sessionStorage.setItem("Data", JSON.stringify(dataTemp));
        setDataTrue(dataTrue);
        setDataFalse(dataFalse);
        Searching(JSON.parse(dataSearch));
    };
    const archived = (data) => {
        const dataSession = sessionStorage.getItem("Data");
        let temp = data;
        let dataTemp = [];
        let dataTrue = [];
        let dataFalse = [];
        JSON.parse(dataSession).map((item) => {
            if (item.id === temp.item.id) {
                if (item.archived === false) {
                    item.archived = true;
                } else {
                    item.archived = false;
                }
            }

            if (item.archived === true) {
                dataFalse.push(item);
            } else {
                dataTrue.push(item);
            }

            dataTemp.push(item);
        });

        sessionStorage.setItem("Data", JSON.stringify(dataTemp));
        sessionStorage.setItem("archived", JSON.stringify(dataFalse));
        sessionStorage.setItem("pindahkan", JSON.stringify(dataTrue));
        setDatas(dataTemp);
        setDataFalse(dataFalse);
        setDataTrue(dataTrue);
        Searching(JSON.parse(sessionStorage.getItem("Search")));
    };

    // firstLoad
    const firstLoad = (data) => {
        const dataSession = sessionStorage.getItem("Data");
        let dataTemp = data;
        let dataTrue = [];
        let dataFalse = [];
        JSON.parse(dataSession).map((item) => {
            if (item.archived === false) {
                dataTrue.push(item);
            } else {
                dataFalse.push(item);
            }
        });

        sessionStorage.setItem("Data", JSON.stringify(dataTemp));
        sessionStorage.setItem("archived", JSON.stringify(dataFalse));
        sessionStorage.setItem("pindahkan", JSON.stringify(dataTrue));
        sessionStorage.setItem("Search", "");
        setDatas(dataTemp);
        setDataFalse(dataFalse);
        setDataTrue(dataTrue);
    };
    const dataPost = (data,search) => {
        const dataPindahkan = sessionStorage.getItem("pindahkan");
        const dataMerge = sessionStorage.getItem("Data");
        const dataPindahkanTemp = JSON.parse(dataPindahkan);
        const dataMergeTemp = JSON.parse(dataMerge);
        dataPindahkanTemp.push(data);
        dataMergeTemp.push(data);
        sessionStorage.setItem("pindahkan", JSON.stringify(dataPindahkanTemp));
        sessionStorage.setItem("Data", JSON.stringify(dataMergeTemp));
        sessionStorage.setItem("Search", JSON.stringify(search));
        setDataTrue(dataPindahkanTemp);
        Searching(search);
    };

   
    return (
        <Layout dataSearching={Searching}>
            <h1 className='text-center font-mono mt-5 text-2xl'>Catatan Aktif</h1>
            <div className='my-4 p-4 bg-slate-200 mx-auto grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 w-[95vw] shadow-lg'>
                <Paper readonly={false} onchange={false} dataPost={dataPost}/>
                {dataLoad ? (
                    <div className='flex justify-center items-center mx-auto w-full p-20 relative col-span-3 lg:col-span-2 xl:col-span-3'>
                        <Loading />
                        <p className='text-center text-2xl absolute lg:bottom-20 md:bottom-5 sm:bottom-0 bottom-0 animate-pulse font-mono'>
                            Loading...
                        </p>
                    </div>
                ) : dataTrue.length > 0 ? (
                    dataTrue.map((res) => {
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
                    })
                ) : (
                    <h1 className='col-span-4 text-center sm:col-span-1 lg:col-span-2 xl:col-span-3 text-2xl animate-pulse font-mono'>
                        Tidak ada catatan
                    </h1>
                )}
            </div>
            <br />
            <h1 className='text-center text-2xl font-mono'>Catatan Archived</h1>
            <div className='my-5 p-5 bg-slate-200 mx-auto grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-5 w-[95vw] shadow-lg'>
                {dataLoad ? (
                    <div className='flex justify-center items-center mx-auto w-full p-20 relative col-span-3  lg:col-span-5 xl:col-span-5'>
                        <Loading />
                        <p className='text-center text-2xl absolute bottom-0 animate-pulse font-mono'>
                            Loading...
                        </p>
                    </div>
                ) : dataFalse.length > 0 ? (
                    dataFalse.map((res) => {
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
                    })
                ) : (
                    <h1 className='col-span-4 text-center sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-2xl animate-pulse font-mono'>
                        Tidak ada catatan
                    </h1>
                )}
            </div>
        </Layout>
    );
}

export default Home;

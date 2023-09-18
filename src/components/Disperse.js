import React,{useState} from "react";
import './Disperse.css'
import errorImage from '../error.png'


const Disperse=(props) => {

    const [error,setError]=useState([]);
    const [data,setData]=useState(props.data);
    const [combineBalance,setCombineBalance]=useState(false)
    const [flag,setFlag]=useState(false)

    const handleSubmit=() => {

        const errorData=[]
        for(let i=0;i<data.length;i++) {
            const itemsArr=data[i].split(" ");
            if(isNaN(itemsArr[1])) {
                let obj={
                    item: data[i],
                    index: i+1,
                    error: `Line ${i+1} wrong output`
                }
                errorData.push(obj);
            }
        }
        if(errorData.length>0) {
            setError(errorData);
            return;
        }


        if(errorData.length===0) {
            const map=new Map();

            for(let i=0;i<data.length;i++) {
                const itemsArr=data[i].split(" ");
                if(!map.has(itemsArr[0])) {
                    map.set(itemsArr[0],i+1);
                } else {
                    let obj={
                        item: data[i],
                        index: i+1,
                        error: `Address ${itemsArr[0]} encountered in Line: ${map.get(itemsArr[0])} , ${i+1}`
                    }
                    errorData.push(obj);
                }
            }

            setError(errorData)
            setFlag(true);
        }
    }


    const keepFirstOneHandleChange=() => {
        const set=new Set();
        const arrData=[];
        for(let i=0;i<data.length;i++) {
            const itemsArr=data[i].split(" ");

            if(!set.has(itemsArr[0])) {
                set.add(itemsArr[0])
                arrData.push(data[i]);
            }
        }
        setData(arrData)
        setError([])
    }

    const combineBalanceChange=() => {

        const map=new Map();
        const arrData=[];
        for(let i=0;i<data.length;i++) {
            const itemsArr=data[i].split(" ");

            if(!map.has(itemsArr[0])) {
                map.set(itemsArr[0],itemsArr[1]);
            } else {
                map.set(itemsArr[0],Number(map.get(itemsArr[0]))+Number(itemsArr[1]));
            }
        }

        for(let [key,value] of map) {
            const str=key+" "+value;
            arrData.push(str);
        }
        setData(arrData)
        setCombineBalance(true);
        setError([])

    }
    return (
        <>

            <div className="container">
                <div className="heading-text">Address with Amounts</div>
                <div className="main-div">
                    <ul className="ul-data-list">
                        {
                            data.map((item,index) => {

                                return <div style={{display: 'flex'}} key={index}><span style={{marginRight: '10px'}}>{index+1}</span><li key={index}> {item}</li></div>
                            })
                        }

                    </ul>

                </div>
                <div className="heading-text">Separated by ',' or '' or '='</div>

                <div className="error-main-div">
                    {error.length>0&&
                        <div>
                            {flag&&
                                (
                                    <div className="error">
                                        <div>Duplicated</div>
                                        <div className="error-methods">
                                            <p style={{cursor: 'pointer'}} onClick={keepFirstOneHandleChange}> keep the first one |  </p> <p style={{cursor: 'pointer'}} onClick={combineBalanceChange}>Combine Balance</p>
                                        </div>
                                    </div>
                                )}
                            <div className="error-div">
                                <div> <img src={errorImage} alt="box-important--v1" /></div>
                                <div className="error-items">
                                    {error.map((item,index) => {
                                        return (
                                            <>
                                               <div key={index}>{item.error}</div><br />
                                            </>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                            <br />
                        </div>

                    }

                </div>

                <div className={`next-btn ${combineBalance? 'next-btn-submit':' '}`} onClick={handleSubmit}>
                    Next
                </div>

            </div>

        </>
    );
}


export default Disperse
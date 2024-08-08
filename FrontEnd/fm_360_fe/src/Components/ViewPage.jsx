import { useState } from "react";

const ViewPage = ()=>{

    let [data,setData] = useState([])

    return(
        <div className="viewpage">
            <h3>Customized Circuits</h3>
            <div id="circuits">
                {data.map((x)=>{
                    <p>{x.a}</p>
                })}
            </div>
        </div>
    );

}
export default ViewPage;
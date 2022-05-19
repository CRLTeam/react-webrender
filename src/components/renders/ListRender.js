import React, {useState, useEffect} from 'react'
import { Card, Tag, Colors } from "@blueprintjs/core"

export default function ListRender( {type, value, webrender} ){
    const [options, ] = useState(value.options)
    const [fieldName, ] = useState(value.fieldName)
    const [renderList, setRenderList] = useState([])

    const [returnObj, setReturnObj] = useState()
    const [objName, setObjName] = useState()

    useEffect(()=>{

      if(type == 'list'){
          let name = value.name
          let list_type = value.type
          if(list_type == 'object'){
            // webrender.get_object(obj_name).then((res) => obj = res)
            get_object(value.object_name)
          }
        }
        // setRenderList(content)
      }, [, webrender.state.rerender]);  

    // useEffect(()=>{

    //   // if(type == 'list'){
    //   //     let name = value.name
    //   //     let list_type = value.type
    //   //     if(list_type == 'object'){
    //         // webrender.get_object(obj_name).then((res) => obj = res)
    //         // get_object(value.object_name)
    //         webrender.processDisplay()
    //     //   }
    //     // }
    //     // setRenderList(content)
    //   }, [webrender.state.data]); 
    
    const get_object = async(obj_name) => {
      let res = await webrender.get_object(obj_name)
      console.log(' res ', res)
      setObjName(obj_name)
      setReturnObj(res)
    }
    
    useEffect(()=>{
      if(returnObj != undefined){
        let content = [];
        // console.log(' return ob changed ', returnObj)
        // console.log(' obj name ', objName)

          content.push(
            // <Card key={JSON.stringify(objName)} interactive={false} elevation={2}>
                // <Tag large={true} minimal={true} round={true}>
                  <h2 key={`h2_${objName}`}>{objName}</h2>
                // </Tag>
              // </Card> 
          )
          if(type == 'list'){
            let objects = returnObj[objName]
            for (let obj in objects) {
              // console.log('oBJ ', obj)
                // let text = options[i].checkBox.text;
                // let checkboxName = fieldName + i;
                // webrender.state[checkboxName] = false;

                content.push(
                    <div key={`div_${obj}`} style={{columnCount: 2}}>
                      <span><p>{obj}</p></span>
                      <span><p><b>{objects[obj]}</b></p></span>
                    </div>
                );
            }
          }
          setRenderList(
            <Tag key={JSON.stringify(returnObj)} large={true} minimal={true} round={true} >
              {content}
            </Tag>)
        }
    }, [returnObj]);  


    return(
      <>
        {type == 'checkboxlist' &&
          <div>
              {renderList}
          </div>
        }
        {type == 'list' &&
          <div>
              {renderList}
          </div>
        }
      </>
    )
  }
  
                    // var checkboxes = [];
                    // let fieldName = value.fieldName;
                    // for (let i = 0; i < value.options.length; i++) {
                    //     let text = value.options[i].checkBox.text;
                    //     let checkboxName = fieldName + i;
                    //     this.state[checkboxName] = false;



                    //     checkboxes.push(
                    //         <div className="form-check">
                    //             <input class="form-check-input" type="checkbox" checked={this.state[checkboxName]} onChange={this.handleInputChange} name={checkboxName} id={checkboxName}/>
                    //             <label class="form-check-label" for={checkboxName}>
                    //                 {text}
                    //             </label>
                    //         </div> 
                    //     );
                    // }

                    // this.displayProcessed.push(
                    //     <form>
                    //         {checkboxes}
                    //     </form>

                    // );
import React, {useState, useEffect} from 'react'

export default function ListRender( {type, value, webrender} ){
    const [options, ] = useState(value.options)
    const [fieldName, ] = useState(value.fieldName)
    const [checkboxes, setCheckboxes] = useState([])

    useEffect(()=>{
      let content = [];

      if(type == 'checkboxlist'){
        
        for (let i = 0; i < options.length; i++) {
            let text = options[i].checkBox.text;
            let checkboxName = fieldName + i;
            webrender.state[checkboxName] = false;



            content.push(
                <div className="form-check">
                    <input class="form-check-input" type="checkbox" checked={webrender.state[checkboxName]} onChange={webrender.handleInputChange} name={checkboxName} id={checkboxName}/>
                    <label class="form-check-label" for={checkboxName}>
                        {text}
                    </label>
                </div> 
            );
        }
        
        setCheckboxes(content)
      }
    }, []);  

    return(
      <>
        {type == 'checkboxlist' &&
          <form>
              {checkboxes}
          </form>
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
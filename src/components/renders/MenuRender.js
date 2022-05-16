import React, {useState, useEffect} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function MenuRender( {type, value, webrender} ){
    const [dropdownContent, setDropdownContent] = useState([])
    const [options, ] = useState(value.options)

    useEffect(()=>{
      let content = [];

      for (let j = 0; j < options.length; j++) {
          let text = (options[j][(j+1).toString()]["text"]);
          let action = (options[j][(j+1).toString()]["action"]);
          
          content.push(
              <Dropdown.Item onClick={() => webrender.buttonClick(text.toString(), action.toString(), webrender)}>{text}</Dropdown.Item>
          );
      }
      setDropdownContent(content)
    }, []);

    return(
      <>
        <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  {dropdownContent}
              </Dropdown.Menu>
          </Dropdown>
      </>
    )
  }
  
// var dropdownContent = [];

// for (let j = 0; j < value.options.length; j++) {
//     let text = (value.options[j][(j+1).toString()]["text"]);
//     let action = (value.options[j][(j+1).toString()]["action"]);

//     // console.log(text);
//     // console.log(action);
    
//     dropdownContent.push(
//         <Dropdown.Item onClick={() => this.buttonClick(text.toString(), action.toString())}>{text}</Dropdown.Item>
//     );
// }
// this.displayProcessed.push(
//     <Dropdown>
//         <Dropdown.Toggle variant="primary" id="dropdown-basic">
//             Menu
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//             {dropdownContent}
//         </Dropdown.Menu>
//     </Dropdown>
// );
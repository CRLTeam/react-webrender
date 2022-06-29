import React, {useState, useEffect} from 'react'
// import Dropdown from 'react-bootstrap/Dropdown';
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core"

export default function MenuRender( {type, value, webrender} ){
    const [menuContent, setMenuContent] = useState([])

    const [menuItems, ] = useState(value.menu_items)
    const [menuName, ] = useState(value.name)
    // const [menuType, ] = useState(value.type)

    useEffect(()=>{
      let content = [];
      console.log('menu items ', menuItems)

      // for (let item of menuItems) {
      //   if (item.type == 'divider'){
      //     let titletext
      //     if (item.label_text == null){
      //       titletext = null
      //     }else{
      //       titletext = `${item.label_text}`
      //     }
      //     content.push(
      //       <MenuDivider key={JSON.stringify(item)} title={titletext}/>
      //     )
      //     continue
      //   }
      //   let data = item.data
      //   console.log('item ', item)

      //   let click
      //   let href = null
      //   if (item.type == 'link'){
      //     // click = () => console.log(`link is ${data.link_url}`)
      //     href = data.link_url
      //   }
        
      //   content.push(
      //       // <Dropdown.Item onClick={() => webrender.buttonClick(text.toString(), action.toString(), webrender)}>{text}</Dropdown.Item>
      //       <MenuItem key={JSON.stringify(item)} icon={item.icon} text={item.label_text} onClick={click} href={href} target="_blank"/>
      //   );
      // }
      content = setMenuItems(menuItems)
      setMenuContent(content)
    }, []);

    const setMenuItems = (menu) => {
      let items = []
      for (let item of menu) {
        let data = item.data
        if (item.type == 'divider'){
          let titletext
          if (item.label_text == null){
            titletext = null
          }else{
            titletext = `${item.label_text}`
          }
          items.push(
            <MenuDivider key={JSON.stringify(item)} title={titletext}/>
          )
        }else if (item.type == 'submenu'){
          let submenuItems = data.menu_items
          items.push(
            <MenuItem key={JSON.stringify(item)} icon={item.icon} text={item.label_text}>
              {setMenuItems(submenuItems)}
            </MenuItem>
          )
        }else{
          console.log('item ', item)

          let click
          let href = null
          if (item.type == 'link'){
            // click = () => console.log(`link is ${data.link_url}`)
            href = data.link_url
          }
          
          items.push(
              // <Dropdown.Item onClick={() => webrender.buttonClick(text.toString(), action.toString(), webrender)}>{text}</Dropdown.Item>
              <MenuItem key={JSON.stringify(item)} icon={item.icon} text={item.label_text} onClick={click} href={href} target="_blank"/>
          );
        }
        
      }
      return items
    }

    return(
      <>
        {/* <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {menuName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                  {dropdownContent}
              </Dropdown.Menu>
          </Dropdown> */}
        <Menu>
          {menuContent}
        </Menu>
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
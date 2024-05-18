// import * as icons from '@ant-design/icons'

// interface Module{
//     [p: string] : any
// }

// const all: Module = icons

// //convert to the label components automatically after passing through
// export default function Icons({name}: {name: string}){
//     const Icon = all[name]
//     return <Icon></Icon>
// }
import * as icons from '@ant-design/icons'


interface Module {
  [p: string]: any
}

const all: Module = icons

// export default function Icon({ name }: { name: string }) {
//   const Icon = all[name]
//   return <Icon></Icon>
// }
export default function Icon({ name }: { name: string }) {
    const AntIcon = all[name];
    
    if (!AntIcon) {
      console.warn(`Icon with name ${name} does not exist.`);
      return null; //or return a default placeholder
    }
  
    return <AntIcon style={{fontSize: '24px' , marginLeft: '-7px'}} />;
  }
  


import { mkdir,writeFile } from 'fs/promises';

let folderName = process.argv[2];
let componentName = process.argv[3];
let isScss = (process.argv[4] === 'scss');

const hypenCaseToCamelCase = (str) => {
  let res = "";
  let i = 0;
  while(i<str.length){
    if(str[i] === '-'){
      i++;
      res += str[i].toUpperCase();
    }else{
      if(i == 0){
        res += str[i].toUpperCase();
      }else{
        res += str[i];
      }
    }
    i++;
  }
  return res;
}

const camelCaseComponentName = hypenCaseToCamelCase(componentName)


let jsxCode = `import React from 'react';
import './${componentName}.styles.${isScss?'scss':'css'}';

const ${camelCaseComponentName} = () => {
  return (
    <div className="${componentName}"></div>
  )
}

export default ${camelCaseComponentName};
`;


const createFolder = async (pathName) => {
  const folderPromise = await mkdir(process.cwd() + pathName).catch(err => {
    //do nothing
  })
}
const createFile = async (pathName, content) => {
  const filePromise = await writeFile(process.cwd()+pathName,content).catch(err => {console.log(err)});
}

createFolder(`/${folderName}`);
createFolder(`/${folderName}/${componentName}`);

const filePath = `/${folderName}/${componentName}`;

createFile(filePath+`/${componentName}.component.jsx`,jsxCode);
if(isScss){
  createFile(filePath+ `/${componentName}.styles.scss`,"");
}else{
  createFile(filePath+ `/${componentName}.styles.css`,"");
}


//node create-componsnt folder-name component-name scss

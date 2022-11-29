/* 
    includerjs v1.0.8 
    Copyright (c) 2022 Lasse Vestergaard 
    Licensed under the MIT license
    Github: https://github.com/lassv/includerjs.git
*/
const INC_LIST=document.querySelectorAll("include"),INC_BODY=document.querySelector("body"),INC_LOGGER=INC_BODY.getAttribute("includer-log"),END_PREFIX=".html",MESSAGE={LOADED:"\u2705 Document loaded with success",ERROR:{PATH:"The <include> tag is required to have the 'path' attribute.",END_WITH:"The <include> tag is required to have the 'id' attribute."}},time=Date.now();INC_LOGGER==="true"&&console.log(`\u{1F50E} Found ${INC_LIST.length} include tags in ${Date.now()-time}ms`),window.addEventListener("load",()=>{console.log(`%c ${MESSAGE.LOADED}`,"background: #222; color: #b00fe6")}),INC_LIST.forEach(t=>{const r="includer-"+Math.floor(Math.random()*1e11);t.setAttribute("id",r);let e=t.getAttribute("path");const n=t.getAttribute("id");function i(){if(e)if(n){if(!e.includes(END_PREFIX))return console.error(`The path to ${e}, must end with ${END_PREFIX}`)}else return console.error(MESSAGE.ERROR.END_WITH);else return console.error(MESSAGE.ERROR.PATH);let o=new XMLHttpRequest;o.open("GET",`${e}`),o.onload=function(){this.status==200&&(document.getElementById(n).innerHTML=this.responseText),INC_LOGGER==="true"&&console.log(`\u26A1 fetched ${e} in ${Date.now()-time}ms`)},o.send()}i()});

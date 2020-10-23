import React from 'react';
import { WebView } from "react-native-webview"; 
 
function jsonArray(data){
    let elements = [];
    for (let index = 0; index < data.length; index++) {
        const temp = jsonPrint(data[index]);
        elements.push(`<li>${temp}</li>`)
    }
    const temp = elements.join(' ');
    return `<ul>${temp}</ul>`;
}

function jsonObject(data){
    let elements = [];
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = jsonPrint(data[key]);
        elements.push(`<tr><th>${key}</th> <td>${value}</td></tr>`);
    }
    const temp = elements.join(' ');
    return `<table border="1"><tbody>${temp}</tbody></table>`;
}

function jsonPrint(data){
    let source = "<p>Loading...</p>";
    if(Array.isArray(data))
        source = jsonArray(data)
    else if(data.constructor === ({}).constructor)
        source = jsonObject(data);
    else 
        source = `<p>${data}</p>`;
    return source;
}

export default function JSONPrint({data}){
    console.log("In json print",data);
    return <WebView style = {{ marginTop:60,flex:1 }} 
    scalesPageToFit={false} 
    source={{html:jsonPrint(data)}}
    injectedJavaScript={`
     const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
     if (!iOS) {
       const meta = document.createElement('meta');
       let initialScale = 1;
       if(screen.width <= 800) {
        initialScale = ((screen.width / window.innerWidth) + 0.1).toFixed(2);
       }
       const content = 'width=device-width, initial-scale=' + initialScale ;
       meta.setAttribute('name', 'viewport');
       meta.setAttribute('content', content);
       document.getElementsByTagName('head')[0].appendChild(meta);
     }
   `}
    />
}
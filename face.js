const btnAnalizar= document.getElementById('btnAnalizar');
const resultado= document.getElementById('resultado');

btnAnalizar.addEventListener('click', analizar);

function analizar() {
    const url = document.getElementById('url').value;
    const urlImagen = document.getElementById('urlImagen');
   
    urlImagen.src = url;

    document.getElementById('url').value="";

    let cabecera = new Headers({
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': '668aeeca645c472a9070bd2c5c3d2ab1'
    });
    let objetoInit = {
        method: 'POST',
        body: JSON.stringify({url: url}),
        headers: cabecera
    };
    let request = new Request ('https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,facialHair,accessories', objetoInit);

    fetch(request).then(response => {
         if(response.ok){
             return response.json();
         }
         else {
             return Promise.reject(new Error(response.statusText));
         }
    }).then(response=> {
        
        let resultadoAnterior = resultado.children[0];
        if (resultadoAnterior){
            resultadoAnterior.remove();
        }
        const html = document.createElement('div');
        html.innerHTML +=`
        <h6>Edad : ${response[0].faceAttributes.age}</h6>
        <h6>Sexo : ${response[0].faceAttributes.gender}</h6>
        <h6>bello facial : ${response[0].faceAttributes.facialHair}</h6>
        <h6>Accesorios : ${response[0].faceAttributes.accessories}</h6>
        `;
    resultado.appendChild(html);
    }).catch(error => {
        console.log(error);  
      });
}
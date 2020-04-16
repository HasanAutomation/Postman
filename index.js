//utility functions

function getElementFromString(string)
{
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

//Initalize no of paramters
let addedParamsCount = 0;
let confirmMessage;
//Hide parameter box initially 
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

// If the user clicks on json,then hide params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('btnSubmitDiv').classList.remove('my-5');
});

// If the user clicks on params boc then hide the json box

let paramsRadio = document.getElementById('paramsRadio');

paramsRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('btnSubmitDiv').classList.add('my-5');
});

// If the user clicks on '+' button then add more parameters
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');

    let string = `<div class="form-row my-2">
<label for="urlField" class="col-sm-2 col-form-label">Parameter ${addedParamsCount+2}</label>
<div class="col-md-4">
  
  <input type="text" class="form-control" id="parameterKey${addedParamsCount+2}" placeholder="Enter parameter ${addedParamsCount+2} key">
</div>
<div class="col-md-4">
  <input type="text" class="form-control" id="parameterValue${addedParamsCount+2}" placeholder="Enter parameter ${addedParamsCount+2} value">
</div>
<button class="btn btn-primary deleteParams">-</button>
</div>`;
addedParamsCount++;

//params.innerHTML+=string;

//alternative way of inserting the element

let paramsElement=getElementFromString(string);
console.log(paramsElement);

params.appendChild(paramsElement);

//add an event listener on - button the remove the parent element

let deleteParams=document.getElementsByClassName('deleteParams');

for(item of deleteParams)
{
    item.addEventListener('click',(e)=>
    { 
        e.target.parentElement.remove();
    })
}

})


//if the user click on submit button

let btnSubmit=document.getElementById('btnSubmit');

btnSubmit.addEventListener('click',()=>
{
    // document.getElementById('requestResponseText').value='Please wait..fetching response';
    document.getElementById('prismJs').innerHTML='Please wait..fetching response';
    // document.getElementById('prismJs').value='Please wait..fetching response';

    //fetch all the values user has entered
    let url=document.getElementById('urlField').value;
    let requestType=document.querySelector("input[name='getPost']:checked").value;
    let contentType=document.querySelector("input[name='jsonCustom']:checked").value;


    console.log(url,requestType,contentType);

    //if user selects custom params then store all the values in an object

    if (contentType == 'Params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else
    {
      data  =document.getElementById('requestJsonText').value;

    }
    console.log(data);

    if(requestType=='GET')
    {
        fetch(url,{
            method:'GET',
        })
        .then((response)=>response.text())
        .then((text)=>
        {
            // document.getElementById('requestResponseText').value=text;
            document.getElementById('prismJs').innerHTML=text;
            // document.getElementById('prismJs').value=text;
            Prism.highlightAll();
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        .then(response=>response.text())
        .then((text)=>
        {
            // document.getElementById('requestResponseText').value=text; 
            document.getElementById('prismJs').innerHTML=text;
            // document.getElementById('prismJs').value=text;
            Prism.highlightAll();
        })
    }
   

})
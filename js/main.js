(function (){

const vresult = document.querySelector('#response-container') ;
const stext = document.querySelector('#search-keyword');
const sbtn = document.querySelector('#submit-btn');
const mbtn = document.querySelector('#load-more');
const key = '14c8aa4e6eee34dba2593ba91f31397d3a4ae82b9128c920b98229c0f42376f8' ;
const initr = vresult.innerHTML ;

var page = 1 ;

stext.addEventListener('change',function(){
	doSeacrh();
});
sbtn.addEventListener('click',function(){
    vresult.innerHTML = initr ;
	doSeacrh() ;	
});
mbtn.addEventListener('click',function(){
	doSeacrh() ;	
});



function doSeacrh (){

	var url = 'https://api.unsplash.com/search/photos?page='+page+'&query=';
	if (stext.value != '') {
	url += stext.value ;
	var ar = new XMLHttpRequest () ;
	ar.open('get', url, true);
	ar.setRequestHeader('Authorization', 'Client-ID '+key);
	ar.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
	     let data = JSON.parse(this.responseText) ; 
	     let tx = '';
         let item = document.createElement('div');

	     for (let i = 0; i < 10; i++)
	     {
		    tx = `<figure>
		     	<img src="${data.results[i].urls.small}" alt="${data.results[i].description}">
		     	<figcaption>
		     		<p>Description : ${data.results[i].description}</p>
		     		<p>Upload by : ${data.results[i].user.name} (<em>@${data.results[i].user.username}</em>)</p>
		     		<p><a href="${data.results[i].links.download}" target="_blank">Download</a></p>
		     	</figcaption>
		     </figure>`;
	     	salvattore.appendElements(vresult, [item]);
	     	item.outerHTML = tx ;
	     }

	     page+=1;
	     if(page > 1)
	     {
	     	document.querySelector('#navigation').style.display = 'flex';
	     }

	    }
	};
	ar.send();
	}

}

})();
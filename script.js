const main = document.querySelector('section');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3819bbdfbemsh728d704970277e1p165420jsn747a79b95703',
		'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
	}
};

async function start() {
	try{
	  const response = await fetch('https://bayut.p.rapidapi.com/properties/detail?externalID=4937770', options);
	  const data = await response.json()
	  console.log(data)
      displayData(data);
	}catch (e){
	  console.log("There was a problem fetching data!")
	}
}


const displayData = (data) => {
     let details = `
       <h1>${data.contactName}<h1>
       <h2>${data.price}$<h2>
       <img src="${data.coverPhoto.url}" alt="img">
       <h2>${data.title}<h2>
       <h3>${data.agency.name}</h3>
       <img class="logologo" src="${data.agency.logo.url}" alt="img">
       <div class="info">
         <ul>
            <li><p><b>price:</b> ${data.price}$</p></li>
            <li><p><b>purpose:</b> ${data.purpose}</p></li>
            <li><p><b>category:</b> ${data.category[0].nameSingular} ${data.category[1].nameSingular}</p></li>
            <li><p><b>completion status:</b> ${data.completionStatus}</p></li>
            <li><p><b>state:</b> ${data.location[0].name}</p></li>
            <li><p><b>city:</b> ${data.location[1].name}</p></li>
            <li><p><b>street:</b> ${data.location[2].name}</p></li>
         </ul>
         <ul>
            <li><p><b>product:</b> ${data.product}</p></li>
            <li><p><b>baths:</b> ${data.baths}</p></li>
            <li><p><b>rooms:</b> ${data.rooms}</p></li>
            <li><p><b>type:</b> ${data.type}</p></li>
            <li><p><b>completion status:</b> ${data.completionStatus}</p></li>
            <li><p><b>is verified:</b> ${!data.isVerified ? ('Not verified') : ('Verified')}</p></li>
            <li><p><b>phone number:</b> ${data.phoneNumber.mobile ? data.phoneNumber.mobile : data.phoneNumber.phone}</p></li>
         </ul>
       </div>
       <div class="description">
        <h2>${data.contactName}</h2>
        <p class="less">${data.description.substring(0,100)}... </p>
        <p class="hide">${data.description} </p>
        <button onclick="showMore(this)">Read more</button>
       </div>
       <div class="slider">
       <div class="images">
            <img src="${data.photos[0].url}">
            <img src="${data.photos[1].url}">
            <img src="${data.photos[2].url}">
       </div>
       <div class="buttons">
          <button onclick="left()"><</button>
          <button onclick="right()">></button>
       </div>
    </div>
      <div class="rate">
        <h2>Calculating the monthly installment for <span>${data.contactName}</span></h2>
        <h3>Please enter the year and calculate the monthly installment</h3>
          <div class="calc">
            <p>$${data.price}</p>
            <input type="number" value="0" min="0">
            <button onclick="calcu(this)">Calculate</button>
          </div>
          <h2 class="display"></h2>
      </div>
      <h3>${data.agency.name}</h3>
      <img class="logologo" src="${data.agency.logo.url}" alt="img">
     `
     main.innerHTML = details;
     
     //Name and price shown in header
     const name = document.querySelector('.name');
     const price = document.querySelector('.priceHeader');
     name.innerText = data.contactName;
     price.innerText = `${data.price}$`;
     
     //Fixed logo
     const logo = document.querySelector('.logo');
     const img = document.createElement('img');
     img.src = data.agency.logo.url;
     logo.appendChild(img);
    
     
}

start();

//Show more description
const showMore = (btn) => {
    let myEl = btn.closest('.description');
    let less = myEl.querySelector('.less');
    let more = myEl.querySelector('.hide');

    if(btn.innerText === 'Read more'){
        less.style.display = 'none';
        more.style.display = 'block';
        btn.innerText = 'Read less'
    } else {
      less.style.display = 'block';
        more.style.display = 'none';
        btn.innerText = 'Read more'
    }
}


    //Slider images function (not working)

    let pictures = document.querySelectorAll('body > section > div.slider > div.images > img');
    
    let imgNum = 0;
    
    const right = () => {
        hidePictures();
    
        imgNum++;
    
        if(imgNum === pictures.length){
            imgNum = 0;
        }
    
        pictures[imgNum].style.display = 'block';
        
    }
    
    const left = () => {
        hidePictures();
    
        imgNum--;
    
        if(imgNum === -1){
            imgNum = pictures.length -1;
        }
    
        pictures[imgNum].style.display = 'block';
    }
    
    
    const hidePictures = () => {
        pictures.forEach(img => {
            img.style.display = 'none';
        });
    }


//Calculating the monthly installment
const calcu = (btn) => {
    let myEl = btn.closest('.calc');
    let parent = myEl.closest('.rate');
    let name = parent.querySelector('h2 > span').innerText;
    let years = myEl.querySelector('input').value;
    let price = myEl.querySelector('p').innerText;
    price = price.substring(1);
    price = parseInt(price);

    if(years > 0){
        let month = years * 12;
        let rate = price / month;
        rate = rate.toFixed(2);

        let displayData = document.querySelector('.display');
        displayData.innerText = `The monthly installment for the ${name} for ${years} years amounts to ${rate}$`;

    } else{
      alert('You must enter a quantity')
    }
    
}
//Copyright and Date
const copyrightYear = document.querySelector('.copyright');
const today = new Date();
copyrightYear.innerHTML = `<h4>Copyright &copy; ${today.getFullYear()}</h4>`;
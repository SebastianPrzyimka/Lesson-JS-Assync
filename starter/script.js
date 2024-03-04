'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Milion People</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// https://countries-api-836d.onrender.com/countries/name/${country}
// important cors should always be unknoown or 'yes
///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//         `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');

/*
// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // render country 1
//     renderCountry(data);

//     // get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call (2)

//     const request2 = new XMLHttpRequest();
//     request.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
//     request.send();

//     request2.addEventListener('load', function () {
//       console.log(this.responseText);
//     });
//   });
// };

// getCountryAndNeighbour('portugal');

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('Portugal');
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// const request = new XMLHttpRequest();
// request.open('GET', `https://countries-api-836d.onrender.com/countries/name/${country}`);
// request.send();

const request = fetch(`https://countries-api-836d.onrender.com/countries/name/portugal`);
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // country (1)
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders?.[0];
//       const neighbour = 'dafdsa';

//       if (!neighbour) return;
//       // country (2)
//       return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('fsafsadsa');

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  // country (1)
  getJson(`https://countries-api-836d.onrender.com/countries/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(data);
      if (!neighbour) throw new Error('no neighbour found');
      // country (2)
      return getJson(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time �
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating �
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code
// 40065808385423925488x105989
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=40065808385423925488x105989`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Problem with geocoding`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       // return fetch(`https://countries-api-836d.onrender.com/countries/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// };
// whereAmI(52.508, 13.381);

console.log('Test Start');
setTimeout(() => console.log('0 sec timer '), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2 ').then(res => {
  for (let i = 0; i < 1000; i++) {
    console.log(res);
  }
  console.log(res);
});
console.log('test end');

const loterryPromise = new Promise(function (resolve, reject) {
  console.log('Loterry draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You Win');
    } else {
      reject(new Error('You lose'));
    }
  }, 2000);
});

loterryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('i waited for 1 second'));

/////////////////////
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.error(x));

////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // ); this is also correct
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));
console.log('Getting Position');

const whereAmI = function (lat, lng) {
  getPosition()
    .then(pos => {
      const { latitide: lat, longitude: lng } = pos.coords;

      fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=40065808385423925488x105989`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Problem with geocoding`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      // return fetch(`https://countries-api-836d.onrender.com/countries/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(err.message);
    });
};

// btn.addEventListener('click', whereAmI);

// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own �
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that �)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK �

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found', img));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    console.log('img 1 loaded');
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(img => {
    console.log('img 2 loaded');
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-3.jpg');
  })
  .catch(err => console.error(err));


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const WhereAmI = async function (country) {
  // Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=40065808385423925488x105989`);
    if (!resGeo.ok) throw new Error('Problem Getting Location Data');

    const dataGeo = await resGeo.json();
    // Same
    // fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(res => console.log(res));
    // DataGeo not working on mine becouse i used all apis keys
    // `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    const res = await fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`);
    if (!res.ok) throw new Error('Problem Getting Country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`Something went wrong ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = WhereAmI('portugal');
// console.log(city);

WhereAmI()
  .then(city => console.log(city))
  .catch(err => console.log(err))
  .finally(() => console.log(`3: Finished getting location`));
console.log('3: Finished getting location');

(async function () {
  try {
    const city = await WhereAmI();
    console.log(`1:${city}`);
  } catch (err) {
    console.log(`2: ${err.message}`);
  }

  console.log('3: Finished getting location');
})();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJson(`https://countries-api-836d.onrender.com/countries/name/${c1}`);
//     // const [data2] = await getJson(`https://countries-api-836d.onrender.com/countries/name/${c2}`);
//     // const [data3] = await getJson(`https://countries-api-836d.onrender.com/countries/name/${c3}`);

//     const data = await Promise.all([
//       getJson(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
//       getJson(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
//       getJson(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital));
//   } catch (err) {
//     console.log(console.error(err));
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

// Promise.race
(async function () {
  const res = await Promise.race([
    getJson(`https://countries-api-836d.onrender.com/countries/name/italy`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/germany`),
    getJson(`https://countries-api-836d.onrender.com/countries/name/portugal`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took to long!'));
    }, sec * 1000);
  });
};

Promise.race([getJson(`https://countries-api-836d.onrender.com/countries/name/portugal`), timeout(5)])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.allSettled
Promise.allSettled([Promise.resolve('Success'), Promise.reject('Error'), Promise.resolve('Success'), Promise.resolve('Success')]).then(res => console.log(res));

// promise.any
Promise.any([Promise.resolve('Success'), Promise.reject('Error'), Promise.resolve('Success'), Promise.resolve('Success')]).then(res => console.log(res));

*/
// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array �
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// createImage('img/img-1.jpg')
//   .then(img => {
//     console.log('img 1 loaded');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';

//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('img 2 loaded');
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';

//     return createImage('img/img-3.jpg');
//   })
//   .catch(err => console.error(err));

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found', img));
    });
  });
};

// let currentImg;

// const loadNPause = async function () {
//   try {
//     let img = await createImage('img/img-1.jpg');
//     createImage(img);
//     await wait(2);
//     img.style.display = 'none';
//     img = await createImage('img/img-2.jpg');
//     await wait(2);
//     img.style.display = 'none';
//     img = await createImage('img/img-3.jpg');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.log(err);
//   }
// };

// loadNPause();

// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array �
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const allImgs = await Promise.all(imgs);
    allImgs.forEach(el => el.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

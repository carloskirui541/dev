/*
Run: npm i axios cheerio

before running the code
*/
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// Send a GET request to the website
axios.get('https://forecast.weather.gov/MapClick.php?lat=34.09976000000006&lon=-118.33197499999994')
  .then((response) => {
    // Create a cheerio object to parse the HTML content
    const $ = cheerio.load(response.data);

    // Find all the forecast items within the week section
    const items = $('#seven-day-forecast-body .tombstone-container');

    // Extract the period names, short descriptions, and temperatures from each forecast item
    const weatherData = [];
    items.each((index, element) => {
      const periodName = $(element).find('.period-name').text();
      const shortDescription = $(element).find('.short-desc').text();
      const temperature = $(element).find('.temp').text();
      weatherData.push([periodName, shortDescription, temperature]);
    });

    // Create a string to store the extracted data
    let csvData = 'period,short_descriptions,temperatures\n';
    weatherData.forEach((data) => {
      csvData += `${data[0]},${data[1]},${data[2]}\n`;
    });

    // Save the data to a CSV file
    fs.writeFileSync('result.csv', csvData);

    // Display the data
    console.table(weatherData);
  })
  .catch((error) => {
    console.error(error);
  });
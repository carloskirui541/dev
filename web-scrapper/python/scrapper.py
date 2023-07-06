# Run: pip install requests beautifulsoup4



import requests
from bs4 import BeautifulSoup
import pandas as pd

# Send a GET request to the website
page = requests.get('https://forecast.weather.gov/MapClick.php?lat=34.09976000000006&lon=-118.33197499999994')

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(page.content, 'html.parser')

# Find the section containing the seven-day forecast
week = soup.find(id='seven-day-forecast-body')

# Find all the forecast items within the week section
items = week.find_all(class_="tombstone-container")

# Extract the period names, short descriptions, and temperatures from each forecast item
period_names = [item.find(class_="period-name").get_text() for item in items]
short_descriptions = [item.find(class_="short-desc").get_text() for item in items]
temperatures = [item.find(class_="temp").get_text() for item in items]

# Create a dataframe to store the extracted data
weather_stuff = pd.DataFrame({
    'period': period_names,
    'short_descriptions': short_descriptions,
    'temperatures': temperatures
})

# Save the dataframe to a CSV file
weather_stuff.to_csv('result.csv')

# Display the dataframe
weather_stuff
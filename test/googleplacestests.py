#!/bin/python3
import requests

def get_places(radius):
    r = requests.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json'
                    + '?key=AIzaSyBKJTUN3wh--XE8VtRRR_UEDKWTevRmCXo&'
                    + 'location=-41.3064632,174.7749782&'
                    + 'radius=' + str(radius))
    return r.json()

print(get_places(500))

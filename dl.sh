#!/bin/bash

# Create the data folder if it doesn't exist
mkdir -p data

# Use a while loop to read lines from urls.txt and names.txt simultaneously
while IFS= read -r url && IFS= read -r filename <&3; do
  # Add ".png" to the end of the filename
  filename="$filename.png"
  # Download the file from the URL and save it with the updated filename in the data folder
  curl -o "data/$filename" "$url"
done < urls.txt 3< names.txt
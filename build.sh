#!/bin/bash

# Create a build directory if it doesn't exist
mkdir -p build

# Define the output zip file name
OUTPUT_ZIP="build/session-cookie-mixer-v1.0.0.zip"

# Remove the old zip if it exists
if [ -f "$OUTPUT_ZIP" ]; then
    rm "$OUTPUT_ZIP"
fi

echo "Packaging extension..."

# Zip the required files, excluding unnecessary dev files and the build directory
zip -r "$OUTPUT_ZIP" manifest.json background.js icons/ popup/ -x "*.DS_Store"

echo "Success! Packed into $OUTPUT_ZIP"

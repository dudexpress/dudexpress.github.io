#!/bin/bash
find ./content/blog -type f -iname "*.jpeg" -exec mogrify -verbose -format jpeg -layers Dispose -resize 1500\>x1500\> -quality 100% {} +
find ./content/blog -type f -iname "*.jpg" -exec mogrify -verbose -format jpg -layers Dispose -resize 1500\>x1500\> -quality 100% {} +
find ./content/blog -type f -iname "*.png" -exec mogrify -verbose -format png -alpha on -layers Dispose -resize 1500\>x1500\> {} +

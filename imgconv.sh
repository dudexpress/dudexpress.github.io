#!/bin/bash
minimumWidth=1500
minimumHeight=1500

for f in $( find ./content/blog -type f -iname "*.jpg" )
do
    imageWidth=$(identify -format "%w" "$f")
    imageHeight=$(identify -format "%h" "$f")

    if [ "$imageWidth" -gt "$minimumWidth" ] || [ "$imageHeight" -gt "$minimumHeight" ]; then
        mogrify -verbose -layers Dispose -resize ''"$minimumWidth"x"$minimumHeight"'' -quality 100% {} + $f
    fi
done

for f in $( find ./content/blog -type f -iname "*.png" )
do
    imageWidth=$(identify -format "%w" "$f")
    imageHeight=$(identify -format "%h" "$f")

    if [ "$imageWidth" -gt "$minimumWidth" ] || [ "$imageHeight" -gt "$minimumHeight" ]; then
        mogrify -verbose -layers Dispose --alpha on -resize ''"$minimumWidth"x"$minimumHeight"'' -quality 100% {} + $f
    fi
done
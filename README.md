# ACASO ANTICORPOS


[AO ACASO](https://anticorpos.github.io/acaso/)
```
python3 videocut.py videotimestamps.json ../acaso-ac-videos/videos/
ffmpeg -ss 00:00:30.0 -i input.wmv -c:a copy -c:v libx264 -t 00:00:10.0 output.mp4
```


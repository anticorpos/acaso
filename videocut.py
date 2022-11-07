import os
import json
import argparse
from datetime import datetime

parser = argparse.ArgumentParser(description='Do all the things')
parser.add_argument('videotimestamps', type=str, help='timestamps filename')
parser.add_argument('folderpath', type=str, help='path to videos folder')
args = parser.parse_args()

with open(args.videotimestamps, 'r') as f:
    data = json.load(f)

for filename, timestamps in data.items():
    if filename != "bacia_negativo.mp4":
        continue
    for i, ts in enumerate(timestamps):
        output_prefix = filename.split('.')[0]
        d0 = datetime.strptime(ts[0], "%H:%M:%S:%f")
        d1 = datetime.strptime(ts[1], "%H:%M:%S:%f")
        cmd = f'ffmpeg -ss {d0.strftime("%H:%M:%S.%f")} -i "{args.folderpath}{filename}" -c:a copy -c:v libx264 -t {d1-d0} output/{output_prefix}_{i}.mp4'
        os.system(f'echo " >>> *** {cmd} ***"')
        os.system(cmd)


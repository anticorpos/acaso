import os
import argparse

parser = argparse.ArgumentParser(description='Do all the things')
parser.add_argument('filename', type=str, help='filename')
args = parser.parse_args()


timestamps = [
    ['00:01:42.19', '00:02:20.04'],
    ['00:03:09.16', '00:04:16.10'],
    ['00:00:00.00', '00:01:42.17'],
    ['00:04:16.12', '00:04:53.12'],
    ['00:02:20.06', '00:03:09.15'],
]

for i, ts in enumerate(timestamps):
    cmd = f'ffmpeg -ss {ts[0]} -i "{args.filename}" -c:a copy -c:v libx264 -t {ts[1]} output{i}.wmv'
    os.system(cmd)

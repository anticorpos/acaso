import argparse
import os
import re
from os.path import isfile, join

parser = argparse.ArgumentParser(description='Do all the things')
parser.add_argument('input', type=str, help='path to input folder')
args = parser.parse_args()

filenames = [f for f in os.listdir(args.input) if isfile(join(args.input, f))]

for n, filename in enumerate(filenames):
    if filename.split('.')[-1] == 'm4v':
        name = filename.split('.')[0]
        print('>>> ', n, name)

        cmd_f = f'ffprobe -v error -select_streams v:0 -show_entries stream=nb_frames -of default=nw=1 {args.input}{filename}'
        res_f = os.popen(cmd_f).read()
        frames = int(re.findall(r'\d+', res_f)[0])

        key_frames = [i*(frames//10)+((frames//10)//2) for i in range(10)]

        for i, f in enumerate(key_frames):
            cmd = f'ffmpeg -i {args.input}{filename} -ss {f//24} -vframes 1 -q:v 2 {args.input}thumbs/{name}_{i}.jpg'
            os.system(cmd)
        
        cmd_gif = f'ffmpeg -f image2 -framerate 3 -i {args.input}thumbs/{name}_%d.jpg -loop 0 {args.input}thumbs/{name}.gif'
        os.system(cmd_gif)


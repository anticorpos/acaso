import argparse
import os
from os.path import isfile, join

parser = argparse.ArgumentParser(description='Do all the things')
parser.add_argument('input', type=str, help='path to input folder')
args = parser.parse_args()

filenames = [f for f in os.listdir(args.input) if isfile(join(args.input, f))]

for filename in filenames:
    # if filename.split('.')[-1] != 'wmv':
    #     continue
    name = filename.split('.')[0]
    output_filename = f"{args.input}converted/{name}.m4v"
    cmd = f'ffmpeg -i "{args.input}{filename}" -vcodec libx264 "{output_filename}"'
    os.system(f'echo " >>> *** {cmd} ***"')
    os.system(cmd)


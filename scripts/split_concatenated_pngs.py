#!/usr/bin/env python3
import sys
from pathlib import Path

frames_dir = Path('client/public/sequence/airflow/frames')
out_dir = frames_dir / 'recovered'
out_dir.mkdir(parents=True, exist_ok=True)

png_sig = b"\x89PNG\r\n\x1a\n"
count = 0
for p in frames_dir.iterdir():
    if not p.is_file():
        continue
    data = p.read_bytes()
    # find all occurrences of PNG signature
    idxs = [i for i in range(len(data)) if data.startswith(png_sig, i)]
    if not idxs:
        continue
    idxs.append(len(data))
    for i in range(len(idxs)-1):
        start = idxs[i]
        end = idxs[i+1]
        chunk = data[start:end]
        count += 1
        out = out_dir / f"{count:04d}.png"
        out.write_bytes(chunk)
        print(f"Wrote {out}")

print(f"Recovered {count} images into {out_dir}")

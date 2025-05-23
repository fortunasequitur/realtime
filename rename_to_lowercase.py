import os

# Ganti path_folder dengan path folder yang ingin diubah
path_folder = 'src/assets/flags'  # Ubah sesuai kebutuhan

for filename in os.listdir(path_folder):
    lower_filename = filename.lower()
    src = os.path.join(path_folder, filename)
    dst = os.path.join(path_folder, lower_filename)
    if filename != lower_filename:
        os.rename(src, dst)
        print(f'Renamed: {filename} -> {lower_filename}') 
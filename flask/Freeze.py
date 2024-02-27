from flask_frozen import Freezer
from App import app
import os
import shutil

# *Goku voice* FRIEZAAAAAAAAAAA!!!!
freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()
    current_dir = os.path.dirname(os.path.realpath(__file__))
    
    build_dir = os.path.join(current_dir, 'build')
    
    file_names = os.listdir(build_dir)
    print(file_names)
    
    for name in file_names:
        source = os.path.join(build_dir, name)
        target = os.path.join(current_dir, '..', name)
        print(str(target))
        shutil.move(source, target)
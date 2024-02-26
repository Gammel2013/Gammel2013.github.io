from flask_frozen import Freezer
from App import app

# *Goku voice* FRIEZAAAAAAAAAAA!!!!
freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()
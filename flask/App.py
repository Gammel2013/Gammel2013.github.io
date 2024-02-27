from flask import Flask, render_template
import glob
from pathlib import Path

app = Flask(__name__)

@app.route('/')
def root():
    root_dir = Path('.').joinpath('templates', 'tabs')
    tabs = [
        {
            'name': 'Basic',
            'path': 'tabs/tab_basic.html',
        },
        {
            'name': 'Meow :3',
            'path': 'tabs/test_tab2.html',
        },
    ]
    print(tabs)
    return render_template('index.html', tabs=tabs)

if __name__ == '__main__':
    app.run()
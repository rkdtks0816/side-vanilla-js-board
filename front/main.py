import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/list")
def listPage():
    
    return render_template('list.html')

@app.route("/edit")
def edit():
    
    return render_template('edit.html')
    
@app.route("/view")
def view():
    
    return render_template('view.html')
    
@app.route("/write")
def write():
    
    return render_template('write.html')

if __name__ == '__main__':

   app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
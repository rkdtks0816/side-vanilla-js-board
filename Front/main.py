import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    
    return render_template('index.html')

@app.route("/dashboard")
def dashboard():
    
    return render_template('/ahu/dashboard.html')

@app.route("/chiller")
def chiller():
    
    return render_template('/ahu/chiller.html')

@app.route("/efficiency")
def efficiency():
    
    return render_template('/efficiency/efficiency.html')

@app.route("/day")
def day():
    
    return render_template('/power/day.html')

@app.route("/hour")
def hour():
    
    return render_template('/power/hour.html')

if __name__ == '__main__':

   app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
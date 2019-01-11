import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

app = Flask(__name__)

# The database URI
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/museums.sqlite"

db = SQLAlchemy(app)

#Create our database model
class Museums(db.Model):
    __tablename__ = 'funstuff'

    museumid= db.Column(db.Integer, primary_key=True)
    museumtype = db.Column(db.String)
    state = db.Column(db.String)

    def __repr__(self):
        return '<Museums %r>' % (self.name)

# Create database tables
# @app.before_first_request
# def setup():
    # Recreate database each time for demo
    # db.drop_all()
    # db.create_all()


@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("/botanical")
def botanical_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'ARBORETUM, BOTANICAL GARDEN, OR NATURE CENTER').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)


@app.route("/art")
def art_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'ART MUSEUM').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)


@app.route("/children")
def children_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = "CHILDREN'S MUSEUM").\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/general")
def general_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'GENERAL MUSEUM').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/historic")
def historic_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'HISTORIC PRESERVATION').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/history")
def history_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'HISTORY MUSEUM').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/natural")
def natural_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'NATURAL HISTORY MUSEUM').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/science")
def science_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'SCIENCE & TECHNOLOGY MUSEUM OR PLANETARIUM').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)

@app.route("/zoo")
def zoo_data():
    """Return state and museum type"""

    # Query for the count of museums by type, by state
    results = db.session.query(Museums.state, func.count(Museums.museumtype)).\
    filter_by(museumtype = 'ZOO, AQUARIUM, OR WILDLIFE CONSERVATION').\
    group_by(Museums.state).all()

    df = pd.DataFrame(results, columns=['states', 'type_count'])

    # Format the data for Plotly
    plot_trace = {
        "x": df["states"].values.tolist(),
        "y": df["type_count"].values.tolist(),
        "type": "bar"
    }
    return jsonify(plot_trace)


if __name__ == '__main__':
    app.run(debug=True)

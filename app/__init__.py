from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'v\xf9\xf7\x11\x13\x18\xfasa60qsMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba6ges3s2srytturyv5r\xfd\x8c\xda'
app.config['UPLOAD_FOLDER'] = "app/static/uploads"
from app import views

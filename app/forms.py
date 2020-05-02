from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed, FileRequired
from wtforms import TextField, FileField
from wtforms.validators import DataRequired
from werkzeug.utils import secure_filename


class UploadForm(FlaskForm):
  Photo = FileField(validators=[FileRequired(), FileAllowed(["jpg","png","jpeg"])])
  Description = TextField(validators = [DataRequired()])
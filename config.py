import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:0520@localhost/secure_offer_portal_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'supersecretkey'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
from flask import Blueprint, jsonify, render_template, request, redirect, url_for, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from app.models import db, User

main_bp = Blueprint('main', __name__)

# Home Route → redirects to login
@main_bp.route('/')
def home():
    return redirect(url_for('main.login_page'))

@main_bp.route('/dashboard')
def show_dashboard_page():
    return render_template('dashboard.html')

@main_bp.route('/api/dashboard', methods=['GET'])
@jwt_required()
def dashboard_api():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        'msg': f'Welcome, {user.name}!',
        'email': user.email
    })

# Render dashboard.html
@main_bp.route('/dashboard-page')
def dashboard_page():
    return render_template("dashboard.html")

# Render Login Page
@main_bp.route('/login')
def login_page():
    return render_template('login.html')

@main_bp.route('/register', methods=['GET', 'POST'])
def register_page():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        if not name or not email or not password:
            return jsonify({'error': 'All fields required'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'User already exists'}), 409

        hashed_pw = generate_password_hash(password)
        new_user = User(name=name, email=email, password_hash=hashed_pw)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Successfully registered'}), 201

    return render_template('register.html')
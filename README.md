PersonaGen05 is an open-source tool designed to streamline the creation of detailed and realistic personas for various applications, including marketing, game development, and UX design. By leveraging advanced AI algorithms, it enables users to generate comprehensive persona profiles tailored to specific project requirements.

**Key Features:**

- **Customizable Persona Generation:** Create personas that align with your project's unique needs by adjusting various attributes.
- **Diverse Templates:** Utilize a selection of templates suitable for different industries and use cases.
- **Real-Time Updates:** Modify persona attributes dynamically and observe immediate changes.
- **User-Friendly Interface:** Navigate through an intuitive design that enhances productivity and ease of use.

**Installation:**

To install PersonaGen05, follow these steps:

# Step 1: Set up a Python virtual environment

python3 -m venv venv

source venv/bin/activate

pip install --upgrade pip

# Step 2: Create a .env file
echo "# Environment variables go here" > .env

# Step 3: Create a .gitignore file with appropriate entries
cat <<EOL > .gitignore
.env
node_modules
venv
__pycache__/
*.pyc
*.pyo
db.sqlite3
EOL

# Step 4: Clone the repository
git clone https://github.com/kliewerdaniel/PersonaGen05.git
cd PersonaGen05/backend

# Step 5: Set up the Django backend
python3 manage.py createsuperuser
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 

# Step 6: Set up the frontend
cd ../ghost-writer-frontend
npm install
npm run dev



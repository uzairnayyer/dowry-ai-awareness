from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/calculate', methods=['POST'])
def calculate_jahaiz():

    try:
        data = request.get_json()
        
        user_name = data.get('userName', '').strip() or 'User'
        user_role = data.get('userRole', 'Groom side')
        monthly_income = data.get('monthlyIncome', '0')
        monthly_expenses = data.get('monthlyExpenses', '0')
        savings = data.get('savings', '0')
        furniture_level = data.get('furnitureLevel', 'Basic')
        vehicle_choice = data.get('vehicleChoice', 'No vehicle')
        
        appliances = data.get('appliances', [])
        
        appliances_text = ', '.join(appliances) if appliances else 'None selected'
        
        fake_total = 3_500_000
        
        return jsonify({
            'success': True,
            'data': {
                'userName': user_name,
                'userRole': user_role,
                'fakeTotal': fake_total,
                'formattedTotal': f"PKR {fake_total:,}",
                'furnitureLevel': furniture_level,
                'appliances': appliances_text,
                'vehicleChoice': vehicle_choice
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400


@app.route('/api/pledge', methods=['POST'])
def record_pledge():
    data = request.get_json()
    user_name = data.get('userName', 'Anonymous')
    
    print(f"Pledge recorded from: {user_name}")
    
    return jsonify({
        'success': True,
        'message': 'Thank you for taking a stand'
    })

if __name__ == '__main__':    
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

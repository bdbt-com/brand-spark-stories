from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import urllib.parse

app = Flask(__name__)
CORS(app)

# Configuration
SUPABASE_URL = "https://xvqhkjgowlwfdosxmvba.supabase.co"
GMAIL_USER = "bdbt533@gmail.com"
GMAIL_PASSWORD = "fpmy yhcu xsqs rbbr"

@app.route('/api/send-guide', methods=['POST'])
def send_guide():
    try:
        data = request.json
        first_name = data.get('firstName')
        email = data.get('email')
        guide_title = data.get('guideTitle')
        guide_filename = data.get('guideFilename')
        
        if not all([first_name, email, guide_title, guide_filename]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        encoded_filename = urllib.parse.quote(guide_filename)
        download_url = f"{SUPABASE_URL}/storage/v1/object/public/guides/{encoded_filename}"
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Your Free Guide: {guide_title}"
        msg['From'] = GMAIL_USER
        msg['To'] = email
        
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: white; padding: 40px; border-radius: 10px;">
              <h1 style="color: #333;">Hi {first_name}! 👋</h1>
              <p style="font-size: 16px; color: #666; line-height: 1.6;">
                Thank you for your interest in <strong>{guide_title}</strong>!
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="{download_url}" style="background-color: #000; color: white; padding: 16px 50px; text-decoration: none; border-radius: 5px;">
                  Download Your Free Guide →
                </a>
              </div>
              <p style="color: #999; font-size: 12px;">
                If the button doesn't work, copy this link:<br>
                <a href="{download_url}">{download_url}</a>
              </p>
            </div>
          </body>
        </html>
        """
        
        msg.attach(MIMEText(html, 'html'))
        
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_PASSWORD)
            server.send_message(msg)
        
        return jsonify({'success': True, 'message': 'Guide sent successfully!'})
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': f'Failed to send email'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

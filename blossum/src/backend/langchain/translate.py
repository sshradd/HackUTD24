import firebase_admin
from firebase_admin import credentials, firestore
from google.cloud import translate_v2 as translate


# Provide the path to your service account key JSON file
cred = credentials.Certificate("./hackutd24-blossum-firebase-adminsdk-7lxjh-88c877d209.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Get Firestore instance
db = firestore.client()


translate_client = translate.Client()

def translate_response(target_lang: str, text: str) -> dict:
    if target_lang == 'en':  # No need to translate if English
        return text

    result = translate_client.translate(text, target_language=target_lang)

    print("Text: {}".format(result["input"]))
    print("Translation: {}".format(result["translatedText"]))
    print("Detected source language: {}".format(result["detectedSourceLanguage"]))

    return result["translatedText"]

def get_user_language(user_id):
    user_ref = db.collection('users').document(user_id)
    user_doc = user_ref.get()
    if user_doc.exists:
        return user_doc.to_dict().get('language', 'en')  # Default to English
    return 'en'

# print(translate_response(get_user_language('OEfj1M8o3RMjIOoubELj9F5qmej2'), 'this is my text based on this user'))
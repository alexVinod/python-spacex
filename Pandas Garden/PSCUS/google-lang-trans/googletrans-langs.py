from googletrans import Translator

def get_run():
    translator = Translator()
    text = input("Enter Your Text:")
    try:        
        if text != "exitx":
            result = translator.translate(text, src='en', dest='te')
            
            print(f"Source Lang: {result.src}")
            print(f"Dest Lang: {result.dest}")
            print(f"Origin Sentance: {result.origin}")
            print(f"Text: {result.text}")
            print(f"Pronu: {result.pronunciation} \n")
            get_run()
        else:
            print("Bye, Have a Nice Day...!")
    except Exception as e:
        print(e)
        

get_run()
        

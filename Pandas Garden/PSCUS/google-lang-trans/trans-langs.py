from translate import Translator

class TranslatorLang:
    
    def get_inputs(self):
        self.flang = input("From Langauage:")
        self.tolang = input("To Langauage:")
        self.text = input("Enter text to translate:")
        
    def result(self):
        try:
            translator= Translator(from_lang=self.flang,to_lang=self.tolang)
            translation = translator.translate(self.text)
            print(translation)
        except Exception as exc:
            print(exc)
        finally:
            op = input("Restart the Process Again (Y/N):").lower()
            if op == "y" or op == "yes":
                tl = TranslatorLang()
                tl.get_inputs()
                tl.result()
            else:
                pass

tl = TranslatorLang()
tl.get_inputs()
tl.result()

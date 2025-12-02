import csv
import json
import os

# Mapping of South African cities/towns to provinces
city_province_map = {
    # Gauteng
    "Johannesburg": "Gauteng", "Pretoria": "Gauteng", "Centurion": "Gauteng", "Sandton": "Gauteng",
    "Midrand": "Gauteng", "Roodepoort": "Gauteng", "Kempton Park": "Gauteng", "Benoni": "Gauteng",
    "Boksburg": "Gauteng", "Germiston": "Gauteng", "Alberton": "Gauteng", "Edenvale": "Gauteng",
    "Randburg": "Gauteng", "Krugersdorp": "Gauteng", "Brakpan": "Gauteng", "Vanderbijlpark": "Gauteng",
    "Vereeniging": "Gauteng", "Soweto": "Gauteng", "Springs": "Gauteng", "Bedfordview": "Gauteng",
    "Meyerton": "Gauteng", "Heidelberg": "Gauteng", "Bronkhorstspruit": "Gauteng", "Cullinan": "Gauteng",
    "Hammanskraal": "Gauteng", "Nigel": "Gauteng", "Lenasia": "Gauteng", "Florida": "Gauteng",
    "Randfontein": "Gauteng", "Carletonville": "Gauteng", "Fochville": "Gauteng", "Westonaria": "Gauteng",
    "Akasia": "Gauteng", "Soshanguve": "Gauteng", "Mamelodi": "Gauteng", "Atteridgeville": "Gauteng",
    
    # Western Cape
    "Cape Town": "Western Cape", "Stellenbosch": "Western Cape", "Paarl": "Western Cape", "George": "Western Cape",
    "Somerset West": "Western Cape", "Bellville": "Western Cape", "Durbanville": "Western Cape", "Parow": "Western Cape",
    "Milnerton": "Western Cape", "Table View": "Western Cape", "Kraaifontein": "Western Cape", "Brackenfell": "Western Cape",
    "Goodwood": "Western Cape", "Kuils River": "Western Cape", "Worcester": "Western Cape", "Mossel Bay": "Western Cape",
    "Knysna": "Western Cape", "Oudtshoorn": "Western Cape", "Hermanus": "Western Cape", "Malmesbury": "Western Cape",
    "Vredenburg": "Western Cape", "Saldanha": "Western Cape", "Langebaan": "Western Cape", "Ceres": "Western Cape",
    "Robertson": "Western Cape", "Montagu": "Western Cape", "Swellendam": "Western Cape", "Beaufort West": "Western Cape",
    "Strand": "Western Cape", "Gordons Bay": "Western Cape", "Fish Hoek": "Western Cape", "Hout Bay": "Western Cape",
    "Tokai": "Western Cape", "Claremont": "Western Cape", "Rondebosch": "Western Cape", "Sea Point": "Western Cape",
    
    # KwaZulu-Natal
    "Durban": "KwaZulu-Natal", "Pietermaritzburg": "KwaZulu-Natal", "Richards Bay": "KwaZulu-Natal", "Newcastle": "KwaZulu-Natal",
    "Pinetown": "KwaZulu-Natal", "Umhlanga": "KwaZulu-Natal", "Westville": "KwaZulu-Natal", "Hillcrest": "KwaZulu-Natal",
    "Amanzimtoti": "KwaZulu-Natal", "Ballito": "KwaZulu-Natal", "Empangeni": "KwaZulu-Natal", "Ladysmith": "KwaZulu-Natal",
    "Port Shepstone": "KwaZulu-Natal", "Margate": "KwaZulu-Natal", "Kokstad": "KwaZulu-Natal", "Vryheid": "KwaZulu-Natal",
    "Dundee": "KwaZulu-Natal", "Estcourt": "KwaZulu-Natal", "Stanger": "KwaZulu-Natal", "KwaDukuza": "KwaZulu-Natal",
    "Ulundi": "KwaZulu-Natal", "Eshowe": "KwaZulu-Natal", "Howick": "KwaZulu-Natal", "Phoenix": "KwaZulu-Natal",
    "Chatsworth": "KwaZulu-Natal", "Tongaat": "KwaZulu-Natal", "Verulam": "KwaZulu-Natal", "Kloof": "KwaZulu-Natal",
    "Durban North": "KwaZulu-Natal", "Mount Edgecombe": "KwaZulu-Natal",
    
    # Eastern Cape
    "Port Elizabeth": "Eastern Cape", "Gqeberha": "Eastern Cape", "East London": "Eastern Cape", "Uitenhage": "Eastern Cape",
    "Kariega": "Eastern Cape", "Mthatha": "Eastern Cape", "Grahamstown": "Eastern Cape", "Makhanda": "Eastern Cape",
    "Queenstown": "Eastern Cape", "Komani": "Eastern Cape", "King William's Town": "Eastern Cape", "Qonce": "Eastern Cape",
    "Jeffreys Bay": "Eastern Cape", "Graaff-Reinet": "Eastern Cape", "Cradock": "Eastern Cape", "Aliwal North": "Eastern Cape",
    "Port Alfred": "Eastern Cape", "Humansdorp": "Eastern Cape", "Butterworth": "Eastern Cape", "Alice": "Eastern Cape",
    
    # Free State
    "Bloemfontein": "Free State", "Welkom": "Free State", "Sasolburg": "Free State", "Kroonstad": "Free State",
    "Bethlehem": "Free State", "Parys": "Free State", "Phuthaditjhaba": "Free State", "Harrismith": "Free State",
    "Virginia": "Free State", "Odendaalsrus": "Free State", "Bothaville": "Free State", "Ficksburg": "Free State",
    "Ladybrand": "Free State", "Heilbron": "Free State", "Frankfort": "Free State", "Vrede": "Free State",
    
    # Mpumalanga
    "Nelspruit": "Mpumalanga", "Mbombela": "Mpumalanga", "Witbank": "Mpumalanga", "Emalahleni": "Mpumalanga",
    "Middelburg": "Mpumalanga", "Secunda": "Mpumalanga", "Ermelo": "Mpumalanga", "Standerton": "Mpumalanga",
    "Piet Retief": "Mpumalanga", "Barberton": "Mpumalanga", "Lydenburg": "Mpumalanga", "Mashishing": "Mpumalanga",
    "White River": "Mpumalanga", "Hazyview": "Mpumalanga", "Malelane": "Mpumalanga", "Komatipoort": "Mpumalanga",
    "Balfour": "Mpumalanga", "Delmas": "Mpumalanga", "Bethal": "Mpumalanga", "Volksrust": "Mpumalanga",
    
    # Limpopo
    "Polokwane": "Limpopo", "Pietersburg": "Limpopo", "Tzaneen": "Limpopo", "Mokopane": "Limpopo",
    "Potgietersrus": "Limpopo", "Louis Trichardt": "Limpopo", "Makhado": "Limpopo", "Thohoyandou": "Limpopo",
    "Phalaborwa": "Limpopo", "Bela-Bela": "Limpopo", "Warmbaths": "Limpopo", "Modimolle": "Limpopo",
    "Nylstroom": "Limpopo", "Lephalale": "Limpopo", "Ellisras": "Limpopo", "Musina": "Limpopo",
    "Giyani": "Limpopo", "Lebowakgomo": "Limpopo", "Jane Furse": "Limpopo",
    
    # North West
    "Rustenburg": "North West", "Mahikeng": "North West", "Mafikeng": "North West", "Potchefstroom": "North West",
    "Klerksdorp": "North West", "Brits": "North West", "Lichtenburg": "North West", "Vryburg": "North West",
    "Orkney": "North West", "Stilfontein": "North West", "Hartbeespoort": "North West", "Zeerust": "North West",
    "Christiana": "North West", "Schweizer-Reneke": "North West", "Wolmaransstad": "North West",
    
    # Northern Cape
    "Kimberley": "Northern Cape", "Upington": "Northern Cape", "Springbok": "Northern Cape", "De Aar": "Northern Cape",
    "Kuruman": "Northern Cape", "Kathu": "Northern Cape", "Postmasburg": "Northern Cape", "Prieska": "Northern Cape",
    "Colesberg": "Northern Cape", "Douglas": "Northern Cape", "Calvinia": "Northern Cape", "Hartswater": "Northern Cape"
}

def get_province(city):
    if not city:
        return "Other"
    
    # Direct lookup
    if city in city_province_map:
        return city_province_map[city]
    
    # Case insensitive lookup
    for k, v in city_province_map.items():
        if k.lower() == city.lower():
            return v
            
    # Partial match (e.g. "Pretoria North" -> "Pretoria")
    for k, v in city_province_map.items():
        if k.lower() in city.lower():
            return v
            
    return "Other"

def process_csv(input_path, output_path):
    counsellors = []
    
    with open(input_path, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.reader(f)
        
        # Skip potential header if it exists (checking first row)
        # We'll iterate and check structure
        
        for i, row in enumerate(reader):
            if not row: continue
            
            # Skip if it looks like a header
            if "Name" in row[0] and "Company" in row[1]:
                continue
                
            # Ensure we have enough columns (at least 10 based on inspection)
            if len(row) < 10:
                continue
                
            name = row[0].strip()
            company = row[1].strip()
            phone = row[2].strip()
            email = row[4].strip()
            ncr_number = row[6].strip()
            address = row[7].strip()
            city = row[9].strip()
            status = row[10].strip() if len(row) > 10 else "Registered"
            
            # Only include registered counsellors
            if status.lower() != "registered":
                continue
                
            province = get_province(city)
            
            counsellors.append({
                "id": i + 1,
                "name": name,
                "company": company,
                "province": province,
                "city": city,
                "phone": phone,
                "email": email,
                "ncr_number": ncr_number,
                "address": address,
                "verified": True, # Assuming all in this list are verified
                "rating": 5.0, # Default rating
                "reviews": 0
            })
            
    # Sort by name
    counsellors.sort(key=lambda x: x['name'])
    
    # Write to JSON file
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(counsellors, f, indent=2)
        
    print(f"Processed {len(counsellors)} counsellors.")

if __name__ == "__main__":
    process_csv('/home/ubuntu/upload/ncr_debt_counsellors.csv', '/home/ubuntu/nca-website/client/src/data/counsellors.json')

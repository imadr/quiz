let flags = ["Islamic Emirate of Afghanistan", "Islamic Republic of Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "the Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "the Central African Republic", "Chad", "Chile", "China", "Colombia", "the Comoros", "the Democratic Republic of the Congo", "the Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "the Czech Republic", "Denmark", "Djibouti", "Dominica", "the Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "The Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "the Marshall Islands", "Mauritania", "Mauritius", "Mexico", "the Federated States of Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "the Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "the Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "the Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "the United Arab Emirates", "the United Kingdom", "the United States", "Uruguay", "Uzbekistan", "Vanuatu", "the Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Abkhazia", "Artsakh", "the Cook Islands", "Kosovo", "Niue", "Northern Cyprus", "Sahrawi Arab Democratic Republic", "Somaliland", "South Ossetia", "Taiwan", "Transnistria"];
let current_flag = 0;

let input = document.querySelector("#input");
input.focus();

function filter_noun(str){
    const pattern = /\b(the|of|and)\b/gi;
    const formattedString = str.replace(pattern, '').toLowerCase().replace(/\s+/g, ' ').trim();
    return formattedString;
}

function edit_distance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    let costs = new Array();
    for(let i = 0; i <= s1.length; i++){
        let last_value = i;
        for(let j = 0; j <= s2.length; j++){
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let new_value = costs[j - 1];
                    if(s1.charAt(i - 1) != s2.charAt(j - 1)){
                        new_value = Math.min(Math.min(new_value, last_value), costs[j]) + 1;
                    }
                    costs[j - 1] = last_value;
                    last_value = new_value;
                }
            }
        }
        if(i > 0){
            costs[s2.length] = last_value;
        }
    }
    return costs[s2.length];
}

function similarity(s1, s2){
    let longer = s1;
    let shorter = s2;
    if(s1.length < s2.length){
        longer = s2;
        shorter = s1;
    }
    let longerLength = longer.length;
    if(longerLength == 0){
        return 1.0;
    }
    return (longerLength - edit_distance(longer, shorter)) / parseFloat(longerLength);
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reroll(){
    let previous_flag = current_flag;
    while(previous_flag == current_flag){
        current_flag = rand(0, flags.length);
    }
    document.querySelector("#flag").src = "flags/"+flags[current_flag]+".png";
}

reroll();

input.onkeydown = function(e){
    if(e.keyCode == 13 && this.value.length > 0){
        let answer = filter_noun(flags[current_flag]);
        let guess = filter_noun(this.value);
        let good_guess = similarity(answer, guess) >= 0.9;
        document.querySelector("#answer").innerHTML = "The answer was "+flags[current_flag];
        document.querySelector("#answer").style.color = good_guess ? "green" : "red";
        this.value = "";
        input.focus();
        if(good_guess) reroll();
    }
};
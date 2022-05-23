import { getData, getName } from "country-list";
import { readFileSync } from "fs";

const books = JSON.parse(readFileSync("./data/books.json", "utf-8"));

const countries = getData();
const countryAdjectives = getAdjectives();

const booksByCountry: { [code: string]: any[] } = {};

const ignoreCountries = ["India"];

function addBook(countryCode: string, book: any) {
  if (!booksByCountry[countryCode]) {
    booksByCountry[countryCode] = [];
  }
  if (booksByCountry[countryCode].includes(book)) return;
  booksByCountry[countryCode].push(book);
}

for (const country of countries.filter(
  (country) => !ignoreCountries.includes(country.name)
)) {
  for (const book of books) {
    if (book.title.includes(country.name)) {
      console.log(`${book.title} -> ${country.code}`);
      addBook(country.code, book);
    }
  }
}

const ignoreAdjectives = ["American"];

console.log(`\n\n`);

for (const country of countryAdjectives.filter(
  (country) => !ignoreAdjectives.includes(country.adjective)
)) {
  for (const book of books) {
    if (book.title.includes(country.adjective)) {
      console.log(`${book.title} -> ${country.countryCode}`);
      addBook(country.countryCode, book);
    }
  }
}

console.log(booksByCountry);

for (const countryCode in booksByCountry) {
  console.log(`${getName(countryCode)}: ${booksByCountry[countryCode].length}`);
}

const numberOfBooks = Object.values(booksByCountry).reduce(
  (acc, books) => acc + books.length, 0);

console.log(`\n\n${Object.keys(booksByCountry).length} countries, ${numberOfBooks} books`);

function getAdjectives() {
  return Object.entries({
    AF: "Afghan",
    AL: "Albanian",
    DZ: "Algerian",
    AD: "Andorran",
    AO: "Angolan",
    AG: "Antiguans",
    AR: "Argentinean",
    AM: "Armenian",
    AU: "Australian",
    AT: "Austrian",
    AZ: "Azerbaijani",
    BS: "Bahamian",
    BH: "Bahraini",
    BD: "Bangladeshi",
    BB: "Barbadian",
    BY: "Belarusian",
    BE: "Belgian",
    BZ: "Belizean",
    BJ: "Beninese",
    BM: "Bermuda",
    BT: "Bhutanese",
    BO: "Bolivian",
    BA: "Bosnian - Herzegovinian",
    BW: "Batswana",
    BV: "Bouvet Island",
    BR: "Brazilian",
    IO: "British Indian Ocean Territory",
    BN: "Bruneian",
    BG: "Bulgarian",
    BF: "Burkinabe",
    BI: "Burundian",
    KH: "Cambodian",
    CM: "Cameroonian",
    CA: "Canadian",
    CV: "Cape Verdean",
    KY: "Cayman Islands",
    CF: "Central African",
    TD: "Chadian",
    CL: "Chilean",
    CN: "Chinese",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombian",
    KM: "Comoran",
    CG: "Congolese (Republic of the Congo)",
    CD: "Congolese (Democratic Republic of the Congo)",
    CK: "Cook Islands",
    CR: "Costa Rican",
    CI: "Ivorian",
    HR: "Croatian",
    CU: "Cuban",
    CY: "Cypriot",
    CZ: "Czech",
    DK: "Danish",
    DJ: "Djibouti",
    DM: "Dominican (Dominica)",
    DO: "Dominican (Dominican Republic)",
    EC: "Ecuadorean",
    EG: "Egyptian",
    SV: "Salvadoran",
    GQ: "Equatorial Guinean",
    ER: "Eritrean",
    EE: "Estonian",
    ET: "Ethiopian",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fijian",
    FI: "Finnish",
    FR: "French",
    GF: "French (French Guiana)",
    PF: "French (French Polynesia)",
    TF: "French (French Southern Territories)",
    GA: "Gabonese",
    GM: "Gambian",
    GE: "Georgian",
    DE: "German",
    GH: "Ghanaian",
    GI: "Gibraltar",
    GR: "Greek",
    GL: "Greenland",
    GD: "Grenadian",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemalan",
    GN: "Guinean",
    GW: "Guinea-Bissauan",
    GY: "Guyanese",
    HT: "Haitian",
    HM: "Heard Island and Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduran",
    HK: "Hong Kong",
    HU: "Hungarian",
    IS: "Icelandic",
    IN: "Indian",
    ID: "Indonesian",
    IR: "Iranian",
    IQ: "Iraqi",
    IE: "Irish",
    IL: "Israeli",
    IT: "Italian",
    JM: "Jamaican",
    JP: "Japanese",
    JO: "Jordanian",
    KZ: "Kazakhstani",
    KE: "Kenyan",
    KI: "I-Kiribati",
    KP: "North Korean",
    KR: "South Korean",
    KW: "Kuwaiti",
    KG: "Kyrgyz",
    LA: "Laotian",
    LV: "Latvian",
    LB: "Lebanese",
    LS: "Mosotho",
    LR: "Liberian",
    LY: "Libyan",
    LI: "Liechtensteiner",
    LT: "Lithuanian",
    LU: "Luxembourger",
    MO: "Macao",
    MG: "Malagasy",
    MW: "Malawian",
    MY: "Malaysian",
    MV: "Maldivan",
    ML: "Malian",
    MT: "Maltese",
    MH: "Marshallese",
    MQ: "Martinique",
    MR: "Mauritanian",
    MU: "Mauritian",
    YT: "Mayotte",
    MX: "Mexican",
    FM: "Micronesian",
    MD: "Moldovan",
    MC: "Monacan",
    MN: "Mongolian",
    MS: "Montserrat",
    MA: "Moroccan",
    MZ: "Mozambican",
    MM: "Burmese",
    NA: "Namibian",
    NR: "Nauruan",
    NP: "Nepalese",
    NL: "Dutch",
    NC: "New Caledonia",
    NZ: "New Zealander",
    NI: "Nicaraguan",
    NE: "Nigerien",
    NG: "Nigerian",
    NU: "Niue",
    NF: "Norfolk Island",
    MK: "Macedonian",
    MP: "Northern Mariana Islands",
    NO: "Norwegian",
    OM: "Omani",
    PK: "Pakistani",
    PW: "Palauan",
    PS: "Palestinian Territory, Occupied",
    PA: "Panamanian",
    PG: "Papua New Guinea",
    PY: "Paraguayan",
    PE: "Peruvian",
    PH: "Filipino",
    PN: "Pitcairn",
    PL: "Polish",
    PT: "Portuguese",
    PR: "Puerto Rico",
    QA: "Qatari",
    RE: "Reunion",
    RO: "Romanian",
    RU: "Russian",
    RW: "Rwandan",
    SH: "Saint Helena",
    KN: "Kittian and Nevisian",
    LC: "Saint Lucian",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoan",
    SM: "San Marinese",
    ST: "Sao Tomean",
    SA: "Saudi",
    SN: "Senegalese",
    SC: "Seychellois",
    SL: "Sierra Leonean",
    SG: "Singaporean",
    SK: "Slovakian",
    SI: "Slovenian",
    SB: "Solomon Islander",
    SO: "Somali",
    ZA: "South African",
    GS: "South Georgia and the South Sandwich Islands",
    ES: "Spanish",
    LK: "Sri Lankan",
    SD: "Sudanese",
    SR: "Surinamer",
    SJ: "Svalbard and Jan Mayen",
    SZ: "Swazi",
    SE: "Swedish",
    CH: "Swiss",
    SY: "Syrian",
    TW: "Taiwanese",
    TJ: "Tajik",
    TZ: "Tanzanian",
    TH: "Thai",
    TL: "East Timorese",
    TG: "Togolese",
    TK: "Tokelau",
    TO: "Tongan",
    TT: "Trinidadian or Tobagonian",
    TN: "Tunisian",
    TR: "Turkish",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvaluan",
    UG: "Ugandan",
    UA: "Ukrainian",
    AE: "Emirian",
    GB: "British",
    US: "American",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguayan",
    UZ: "Uzbekistani",
    VU: "Vanuatu",
    VE: "Venezuelan",
    VN: "Vietnamese",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Welsh",
    EH: "Western Sahara",
    YE: "Yemenite",
    ZM: "Zambian",
    ZW: "Zimbabwean",
    AX: "Åland Islands",
    BQ: "Bonaire, Sint Eustatius and Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Manx",
    JE: "Jersey",
    ME: "Montenegrin",
    BL: "Saint Barthélemy",
    MF: "Saint Martin (French part)",
    RS: "Serbian",
    SX: "Sint Maarten (Dutch part)",
    SS: "South Sudan",
    XK: "Kosovo",
  }).map(([countryCode, adjective]) => ({ countryCode, adjective }));
}

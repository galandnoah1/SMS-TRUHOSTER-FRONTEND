export const pages_map = {
    HOME: "home",
    STUDENTS: "students",
    CLASSES: "classes",
    GRADES: "grades",
    BULLETINS: "bulletins",
    TEACHERS: "teachers",
    USERS: "users",
    ANNOUNCES: "announces",
    SETTINGS: "settings",
    FRAIS: "frais"
}


export const sections = [
    "anglophone",
    "francophone"
]

export const levels = {
    francophone: [
        "6e",
        "5e",
        "4e",
        "3e",
        "2nde",
        "1ere",
        "tle",

    ],

    anglophone: [
        "form 1",
        "form 2",
        "form 3",
        "form 4",
        "form 5",
        "upper sixth",
        "lower sixth"
    ]
}

export const series = {
    francophone: [
        "A",
        "D",
        "C",
    ],

    anglophone: [
        "ART",
        "SC",
    ]
}

export const lv2 = [
    "esp",
    "all"
]

export const subjects = {
    francophone: [
        "Mathematiques",
        "Français",
        "Anglais",
        "Physique",
        "SVT",
        "Francais",
        "Philosophie",
        "Informatique",
        "EPS"
    ],

    anglophone: [
        "Mathematics",
        "Science",
        "Citizenship",
        "Hstory",
        "Geography",
        "Physics",
        "Manual labor"
    ]
}

export const evaluations = [
    "cc1",
    "cc2",
    "cc3",
    "cc4",
    "cc5",
    "cc6"
]

export const ROLES = [
    "ADMIN",
    "SECRETAIRE",
    "ENSEIGNANT",
    "STUDENT"
]


export const classes = [
    {
        id: crypto.randomUUID(),
        niveau: "6e",
        serie: null,
        lv2: null,
        section: sections[1],
        nom: "6e A",
        effectif: 40
    },
    {
        id: crypto.randomUUID(),
        niveau: "1ere",
        serie: "c",
        lv2: null,
        section: sections[1],
        nom: "1ere C",
        effectif: 10
    },
    {
        id: crypto.randomUUID(),
        niveau: "tle",
        serie: "a4",
        lv2: "all",
        section: sections[1],
        nom: "Tle A4 All",
        effectif: 14,
    },
    {
        id: crypto.randomUUID(),
        niveau: "form 2",
        serie: null,
        lv2: null,
        section: sections[0],
        nom: "Form 2",
        effectif: 10,
    },
]

export const students = [
    {
        id: crypto.randomUUID,
        nom: "Kamga",
        prenom: "Piere",
        matricule: "MD1203",
        niveau: "tle",
        serie: "c",
        sexe: "M",
        classe: "tle c",
        section: sections[1]
    },
    {
        id: crypto.randomUUID,
        nom: "Kenfack",
        prenom: "Hans",
        matricule: "MD1204",
        niveau: "1ere",
        serie: "c",
        sexe: "M",
        classe: "1ere c",
        section: sections[1]
    },
    {
        id: crypto.randomUUID,
        nom: "Anama",
        prenom: "Joseph",
        matricule: "MD785",
        niveau: "form 1",
        serie: null,
        sexe: null,
        classe: "form 1",
        section: sections[0]
    }
]

export const teachers = [
    {
        id: crypto.randomUUID(),
        nom: "Eboko",
        prenom: "Jean Jules",
        matiere: [
            "mathematiques"
        ],
        classes: [
            "tle c",
            "3e all"
        ],
        contact: "675123697",
        statut: "actif",
    },

    {
        id: crypto.randomUUID(),
        nom: "Wamba",
        prenom: "Willy",
        matiere: [
            "mathematiques"
        ],
        classes: [
            "1re c",
            "3e all"
        ],
        contact: "675123697",
        statut: "actif",
    },

    {
        id: crypto.randomUUID(),
        nom: "Anuake",
        prenom: "Linus",
        matiere: [
            "english language"
        ],
        classes: [
            "tle c",
            "tle d",
            "tle a4 all"
        ],
        contact: "675123697",
        statut: "actif",
    },
]

export const users = [
    {
        id: crypto.randomUUID(),
        nom: "truhoster",
        email: "admin@sms-truhoster.cm",
        role: ROLES[0],
        password: "admin123",
    },

    {
        id: crypto.randomUUID(),
        nom: "Anala",
        email: "secretaire01@sms-truhoster.cm",
        role: ROLES[1],
        password: "secretaire123",
    }
]


export const fees_types = [
    "inscription",
    "tranche 1",
    "tranche 2"
]

export const registration_fees = 25000

export const school_fees = {
    "6e": {
        tranche1: 75000,
        tranche2: 45000
    },
    "5e": {
        tranche1: 75000,
        tranche2: 45000
    },

    "4e": {
        tranche1: 75000,
        tranche2: 45000
    },
    "tle": {
        tranche1: 85000,
        tranche2: 50000
    },
}

export const payments = [
    {
        id: crypto.randomUUID(),
        studentId: students[0].id,
        studentName: `${students[0].nom} ${students[0].prenom}`,
        studentClass: students[0].classe,
        amount: 25000,
        fees_types: fees_types[0],
        date: new Date().toDateString()
    },
    {
        id: crypto.randomUUID(),
        studentId: students[1].id,
        studentName: `${students[1].nom} ${students[1].prenom}`,
        studentClass: students[1].classe,
        amount: 75000,
        fees_types: fees_types[1],
        date: new Date().toDateString()
    }
]



export const notifications = [
    {
        id: crypto.randomUUID(),
        title: "Paiement de la premiere tranche",
        content: null,
        redirect_to: null,
        read: false
    },
     {
        id: crypto.randomUUID(),
        title: "Remise des bulletions",
        content: null,
        redirect_to: null,
        read: false
    },
     {
        id: crypto.randomUUID(),
        title: "Notes de la premiere sequence",
        content: null,
        redirect_to: null,
        read: true
    }
]


let serverURLs = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "9898",
        "MYSQL_HOST": 'localhost',
        "MYSQL_USER": 'ambuj',
        "MYSQL_PASSWORD": 'Techugo@123',
        'MYSQL_DATABASE': 'cancan',
        "EMAIL_USER": 'test.techugo@gmail.com',
        "EMAIL_PASS": 'LUCKY@05',
        "EMAIL_HOST": 'smtp.gmail.com',
        "EMAIL_PORT": 465,
        "EMAIL_SECURE": true,
    },
    "live": {
        "NODE_SERVER": "http://13.126.131.184",
        "NODE_SERVER_PORT": "9898",
        "MYSQL_HOST": 'localhost',
        "MYSQL_USER": 'root',
        "MYSQL_PASSWORD": '6$*vM94G',
        'MYSQL_DATABASE': 'cancan',
        "EMAIL_USER": 'test.techugo@gmail.com',
        "EMAIL_PASS": 'LUCKY@05',
        "EMAIL_HOST": 'smtp.gmail.com',
        "EMAIL_PORT": 465,
        "EMAIL_SECURE": true,
    }
}

module.exports = {
    serverURLs: serverURLs
}
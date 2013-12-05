/*
           __  __  _             
  ___ ___ / /_/ /_(_)__  ___ ____
 (_-</ -_) __/ __/ / _ \/ _ `(_-<
/___/\__/\__/\__/_/_//_/\_, /___/
                       /___/                                        
*/

module.exports = {

	// Express (HTTP) Server settings
	http: {
		port: (process.env.PORT || 8001)
	},

	// MongoDB details
	database: {
		credentials: {
			server: "mongodb://USERNAME:PASSWORD@SERVER:PORT/DATABASENAME"
		}
	},

	// Amazon details
	amazon: {
		type: 's3',
		bucket: 'BUCKETNAME',
		credentials: {
			accessKeyId: 'ACCESSKEYID',
			secretAccessKey: 'SECRETACCESSKEY'
		}
	},

	// Mail details
	mail: {
		type: 'SMTP',
		credentials: {
		    service: 'Gmail',
		    auth: {
		        user: 'USERNAME',
		        pass: 'PASSWORD'
		    }
		},
		from: 'FIRSTNAME LASTNAME <EMAILADDRESS>',
		to: 'FIRSTNAME LASTNAME <EMAILADDRESS>',
	}

};

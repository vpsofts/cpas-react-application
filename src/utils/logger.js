/*
 * ===========================================================================
 * IBA CZ Confidential
 *
 * © Copyright IBA CZ 2016 ALL RIGHTS RESERVED
 * The source code for this program is not published or otherwise
 * divested of its trade secrets.
 * ===========================================================================
 */

/**
 * Created by petr.vasek@ibacz.eu on 18.09.2016.
 */

var LogLevel = {
	DEBUG: 0,
	WARN: 1,
	ERROR: 2,
	INFO: 3
}

var loggerConfig = {
	level: LogLevel.DEBUG
}


const LoggerFactory = {

	enableDebug(enable, disableLogLevel) {
		this.setLogLevel(enable ? LogLevel.DEBUG : (LogLevel.ERROR || disableLogLevel));
	},

	setLogLevel(logLevel) {
		loggerConfig.level = logLevel;
	},

	getLogger(scope) {

		var _scope = scope;

		return {
			debug(arg1,arg2){
				this.log(arg1,arg2,LogLevel.DEBUG);
			},
			error(arg1,arg2){
				this.log(arg1,arg2,LogLevel.ERROR)
			},
			info(arg1,arg2){
				this.log(arg1,arg2,LogLevel.INFO)
			},
			warn(arg1,arg2){
				this.log(arg1,arg2,LogLevel.WARN)
			},
			log(arg1,arg2,level){

				if (level >= loggerConfig.level) {

					let dt = new Date();
					let dtString = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " " + dt.getMilliseconds();
					let consoleMethod = 'log';
					let typeString = 'INFO';

					switch(level) {
						case LogLevel.WARN:
							consoleMethod = 'warn';
							typeString = 'WARNNING';
							break;
						case LogLevel.ERROR:
							consoleMethod = 'error';
							typeString = 'ERROR';
							break;
						case LogLevel.INFO:
							consoleMethod = 'info';
							typeString = 'INFO';
							break;
						case LogLevel.DEBUG:
							consoleMethod = 'log';
							typeString = 'DEBUG';
							break;
					}

					if (typeof arg1 === 'string') {
						arg1 = "["+typeString+"][" + _scope + "][" + dtString + "]" + arg1
					}

					if (arg2 == null) {
						console[consoleMethod](arg1);
					} else {
						console[consoleMethod](arg1, arg2);
					}
				}

			}
		}
	}
}

export {LogLevel};
export default LoggerFactory;

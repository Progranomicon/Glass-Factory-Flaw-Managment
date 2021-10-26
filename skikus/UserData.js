var debug = 1;
var productionParams={};
var currentParam;
var currentParamId;
var currentProductionId;
var currentLine = 0;
var productionList={};
var lineState={};
var clickSec, clickPos, moldMoveId;
var serverTime = moment("1990-01-01 01:01:01");
var lastUpdateTime = moment();
var timeDiff = 0;
var pass = '4444';
var isAuth = false;
var timerIsOn = true;
var newFlaw = {"moldsIdsList":"",
			   "flaw_type":"110",
			   "flaw_part":"",
			   "action":"2",
			   "parameter_value":"",
			   "comment":""};

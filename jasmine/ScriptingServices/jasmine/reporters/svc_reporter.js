/* globals $ */
/* eslint-env node, dirigible */

(function() {
	'use strict';
	
	var response = require("net/http/response");
	
	var reporter = {
	
		data: {
			tests: [],
			testSuite: {}
		},
		
		jasmineStarted: function(suiteInfo) {
			this.data.testSuite.total = suiteInfo.totalSpecsDefined;
		},
		suiteStarted: function(result) {
			var test = this.data.tests.filter(function(entry){
				return result.id === entry.id;
			})[0];
			if(!test){
				test = {
					name: result.description,
					assertions: []
				};
				this.data.tests.push(test);
			}	    	
		},	
		specStarted: function(result) {
		},
		specDone: function(result) {
			this.data.testSuite.passed = result.status;
			var assertions = [];
			if(result.failedExpectations.length>0){
				assertions = result.failedExpectations.map(function(assertion){
					return {
						message: result.description + ' failed on expectation ' + assertion.message,
						result: result.passed==='passed'? true: false
					};
				});
				if(this.data.testSuite.failed === undefined)
					this.data.testSuite.failed = assertions.length;
				else 
					this.data.testSuite.failed += assertions.length;
			} else {
				assertions.push({
					message: result.description + ' ' + result.status,
					result: result.status==='passed'? true: false
				});
			}
			this.data.tests[0].assertions = this.data.tests[0].assertions.concat(assertions);
		},	
		suiteDone: function(result) {
	    	this.data.testSuite.passed = (this.data.testSuite.total - this.data.testSuite.failed);
		},
		jasmineDone: function() {
			response.setContentType("application/json; charset=UTF-8");
			response.setCharacterEncoding("UTF-8");	
			response.print(JSON.stringify(this.data));
			response.flush();
			response.close();
		}
	};
	
	exports.jasmine_svc_reporter = reporter;

})();
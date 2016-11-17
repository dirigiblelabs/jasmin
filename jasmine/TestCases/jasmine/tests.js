/* globals $ */
/* eslint-env node, dirigible */
var j = require("jasmine/jasmine");
var console_reporter = require("jasmine/reporters/console_reporter");
var svc_reporter = require("jasmine/reporters/svc_reporter");

var jasmine = j.core(j);
var env = jasmine.getEnv();

env.addReporter(console_reporter.jasmine_console_reporter);
env.addReporter(svc_reporter.jasmine_svc_reporter);

var $$j = j.interface(jasmine, env);

$$j.describe("A suite is just a function", function() {
    
    $$j.it("and has a positive case", function() {
		$$j.expect(false).toBe(true);
	});
	
	$$j.it("and can have a negative case", function() {
		$$j.expect(false).not.toBe(true);
	});	  

});

jasmine.getEnv().execute();

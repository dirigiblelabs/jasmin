# jasmine
[Jasmine](https://jasmine.github.io/) module for Unit and BDD style testing JavaScript services in Dirigible.

Usage
<pre>
var j = require("jasmine/jasmine");
var jasmine = j.core(j);
var env = jasmine.getEnv();
var $$j = j.interface(jasmine, env);

$$j.describe("A suite is just a function", function() {
    
    $$j.it("and has a positive case", function() {
    	
		$$j.expect(false).toBe(true);
	});
	
	$$j.it("and can have a negative case", function() {
		$$j.expect(false).not.toBe(true);
	});	  

});

//Service these tests
require("jasmine/jasmine_test_runner_svc").service(env);
</pre>

Provides two result reporters. One to support the test runner service ("jasmine/jasmine_test_runner_svc" shown above) and one that outputs to the console. Both can be used together.
To enable the console reporter:
<pre>
var console_reporter = require("jasmine/reporters/console_reporter");
var jasmine = j.core(j);
var env = jasmine.getEnv();
env.addReporter(console_reporter.jasmine_console_reporter);
</pre>

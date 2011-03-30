(function(){
	if (meme.config.tests_enabled) {
		var testWindow = Titanium.UI.createWindow({
			title:'Application Tests',
			backgroundColor: 'white',
			navBarHidden: true,
			zIndex: 999
		});
		testWindow.open();
		
		var testsWebView = Ti.UI.createWebView({
			html: 	'',
			top: 	5,
		    left: 	5,
			width: 	310,
			height: 470
		});
		testWindow.add(testsWebView);
		
		var testResults = '';
		var testResultsBegin = '<html><head><style type="text/css">body{font-size:10px;font-family:helvetica;}</style></head><body>';
		var testResultsEnd = '</body></html>';
		var updateTestResults = function(message) {
			testResults += message;
			testsWebView.html = testResultsBegin + testResults + testResultsEnd;
		};

		Ti.include('/test/lib/jasmine-1.0.2.js');
		
		// Include all the test files
		Ti.include('/test/test_util.js');
		
	    var TitaniumReporter = function() {
	        this.started = false;
	        this.finished = false;
	    };

	    TitaniumReporter.prototype = {
	        reportRunnerResults: function(runner) {
	            this.finished = true;
	            this.log('<h3>Test Runner Finished.</h3>');
	        },

	        reportRunnerStarting: function(runner) {
	            this.started = true;
	            this.log('<h3>Test Runner Started.</h3>');
	        },

	        reportSpecResults: function(spec) {
				var resultText = '<font color="#FF0000">Failed.</font><br>';

	            if (spec.results().passed()) {
	                resultText = '<font color="#009900">Passed.</font><br>';
	            }

	            this.log(resultText);
	        },

	        reportSpecStarting: function(spec) {
	            this.log('[' + spec.suite.description + '] ' + spec.description + '... ');
	        },

	        reportSuiteResults: function(suite) {
	            var results = suite.results();

	            this.log('[' + suite.description + '] ' + results.passedCount + ' of ' + results.totalCount + ' passed.<br>');
	        },

	        log: function(str) {
	            updateTestResults(str);
	        }
	    };
		
		jasmine.getEnv().addReporter(new TitaniumReporter());
		jasmine.getEnv().execute();
	}
})();
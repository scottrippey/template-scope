describe("template-scope", function() {
	beforeEach(module('templateScope'));

	function bootstrap(html, scope) {
		var element = angular.element(html);
		inject(function($compile, $rootScope) {
			angular.extend($rootScope, scope);
			$compile(element)($rootScope);
			$rootScope.$apply();
		});
		return element;
	}

	
	
	beforeEach(inject(function($templateCache) {	
		$templateCache.put("userTemplate.html", 
			"<div template-scope='{ title: \"@\", user: \"=\", select: \"&onSelect\" }'>" +
				"<h2> {{ title }} </h2>" +
				"<h3> {{ user.first }} {{ user.last }} </h3>" +
				"<button ng-click='select()'> Select </button>" +
			"</div>"
		);
	}));
	
	describe("template-scope-set", function(){
		
		var element;
		beforeEach(function(){
			element = bootstrap(
				"<div>" +
					"<div " +
						"ng-include='\"userTemplate.html\"' " +
						"template-scope-set " +
						"title='Hello {{ user1.first }}' " +
						"user='user1' " +
						"on-select='user1.selected = true' " +
					"></div>" +
					"<div " +
						"ng-include='\"userTemplate.html\"' " +
						"template-scope-set " +
						"title='Hi {{ user2.first }}' " +
						"user='user2' " +
						"on-select='user2.selected = true' " +
					"></div>" +
				"</div>",
				{
					user1: { first: 'Dwight', last: 'Schrute' },
					user2: { first: 'Michael', last: 'Scott' }
				}
			);
		});
		
		it('sets the nested scope', function() {
			expect(element.find('h2').text()).toBe(" Hello Dwight " + " Hi Michael ");
			expect(element.find('h3').text()).toBe(" Dwight Schrute " + " Michael Scott ");
		});
		
		it('the nested scope is bound and updates', inject(function($rootScope) {
			var swap = $rootScope.user1;
			$rootScope.user1 = $rootScope.user2;
			$rootScope.user2 = swap;
			$rootScope.$apply();
			
			expect(element.find('h2').text()).toBe(" Hello Michael " + " Hi Dwight ");
			expect(element.find('h3').text()).toBe(" Michael Scott " + " Dwight Schrute ");
		}));
		
		
		
		
	});
});
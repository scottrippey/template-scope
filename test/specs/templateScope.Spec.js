describe("template-scope", function() {
	beforeEach(module('templateScope', 'spec-templates'));

	function bootstrap(url, scope) {
		var element;
		inject(function($templateCache, $compile, $rootScope) {
			var html = $templateCache.get(url);
			element = angular.element(html);
			angular.extend($rootScope, scope);
			$compile(element)($rootScope);
			$rootScope.$apply(); // without this, ng-include doesn't get processed
		});
		return element;
	}

	describe("template-scope-set", function(){
		
		var element;
		beforeEach(function(){
			element = bootstrap("parentTemplate.html", {
				user1: { first: 'Dwight', last: 'Schrute' },
				user2: { first: 'Michael', last: 'Scott' },
				selectedUser: null
			});
		});
		
		it('sets the nested scope', function() {
			expect(element.find('h2').text()).toBe(" Hello Dwight " + " Hi Michael " + "  ");
			expect(element.find('h3').text()).toBe(" Dwight Schrute " + " Michael Scott " + "   ");
		});
		/*
		it('the nested scope is bound and updates', inject(function($rootScope) {
			var swap = $rootScope.user1;
			$rootScope.user1 = $rootScope.user2;
			$rootScope.user2 = swap;
			$rootScope.$apply();
			
			expect(element.find('h2').text()).toBe(" Hello Michael " + " Hi Dwight ");
			expect(element.find('h3').text()).toBe(" Michael Scott " + " Dwight Schrute ");
		}));
		*/
		
		
		
		
	});
});
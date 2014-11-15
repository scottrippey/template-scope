angular.module('templateScope', [])
	.directive('templateScopeSet', function () {
		return {
			controller: 'templateScopeController',
			link: { 
				pre: function (scope, element, attrs, setCtrl) {
					setCtrl.setBindings(scope, attrs);
				}
			}
		};
	})
	.directive('templateScope', function () {
		return {
			scope: true, // TODO: Manually bind children to an isolate scope (instead of this "new" scope)
			require: '^templateScopeSet',
			link: function (scope, element, attrs, templateScopeController) {
				var definitions = scope.$eval(attrs.templateScope);
				templateScopeController.getBindings(scope, definitions);
			}
		};
	})
	.controller('templateScopeController', function TemplateScopeController() {
		this.setBindings = setBindings;
		this.getBindings = getBindings;

		var parentScope, parentAttrs, templateScope, templateDefinitions;
		function setBindings(scope, attrs) {
			parentScope = scope;
			parentAttrs = attrs;
		}
		function getBindings(scope, definitions) {
			templateScope = scope;
			templateDefinitions = definitions;

			_applyBindings();
		}

		function _applyBindings() {
			var definitions = templateDefinitions;
			var scope = templateScope;

			// Do all the hard stuff:
			Object.keys(definitions).forEach(function (definition) {

				var binding = definitions[definition];
				var firstChar = binding.substr(0, 1);
				var alias = binding.substr(1) || definition;

				switch (firstChar) {
					case "@":
						// Input attribute
						parentAttrs.$observe(alias, function (value) {
							scope[definition] = value;
						});
						break;
					case "&":
						// Output parameter
						scope[definition] = function (params) {
							parentScope.$eval(parentAttrs[alias], params);
						};
						break;
					case "=":
						// Two-way databinding
						parentScope.$watch(parentAttrs[alias], function (value) {
							scope[definition] = value;
						});
						scope.$watch(definition, function (value) {
							parentScope.$eval(parentAttrs[alias] + " = $newValue", { $newValue: value });
						});
						break;
					default:
						throw new Error("templateScope - Unrecognized binding: " + binding);
				}

			});
		}

	})
;

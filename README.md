AngularJS Affix
=============================

**Angular Affix** is an AngularJS affix directive.

### Current Version 0.1.0

# Getting stated
Optionally: to install with bower, use:

```
bower install --save ng-affix
```

# Add AngularJS Affix

Add the module in your angular module.

````javascript
angular.module('main', ['ngAffix']);
````

## How to use

Angular affix directive working with the attribute element (restrict: 'A').
 
 ```html
 <div affix start-class="affix-start" stop-class="affix-stop" offset="60" stop-element="elementStop">
 ```
 
 For more advanced functionality you can add a couple of options:
 
 ```html
 <div
  affix
  start-class = "String" (the class that is injected when the element is in its top-most position)
 	stop-class = "String" (the class that is injected when the element is in its bottom-most position)
 	offset = "String" (the offset added to the top-most position)
 	stop=element = "Optional String" (the elementId used to apply the bottom-most position, by default using the parent div)
 	>
 </div>
 ```
 



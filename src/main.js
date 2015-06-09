/* koLazyOptions main */

ko.bindingHandlers.lazyOptions = {
  init: function(element, valueAccessor, allBindings) {
    var initialized = false;
    var focused = ko.observable();
    
    var options = ko.computed({
      read: function() {
        if (!initialized && !focused()) {
          var value = ko.unwrap(allBindings.get("value"));
          var optionsValue = allBindings.get("optionsValue");

          if (optionsValue) {
            var actualArray = ko.unwrap(valueAccessor());
            $.each(actualArray, function(i, item) {
              if (item[optionsValue] === value) {
                value = item;
                return false;
              }
              return true;
            });
          }
          
          if (!value) return [];

          return [value];
        }

        initialized = true;
        return ko.unwrap(valueAccessor());
      },
      disposeWhenNodeIsRemoved: element
    });

    ko.applyBindingsToNode(element, {
      hasFocus: focused,
      options: options,
      optionsText: allBindings.get("optionsText"),
      optionsValue: allBindings.get("optionsValue"),
      optionsCaption: allBindings.get("optionsCaption"),
      value: allBindings.get("value")
    });
  }
};
